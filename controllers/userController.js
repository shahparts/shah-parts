const User = require('../models/userModel');
var bcrypt = require('bcryptjs');
const config = require('../config/keys');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../nodemailer');

exports.getAllUsers = async (req, res) => {
    try {
        const findUsers = await User.find({ role: 0 });
        if (findUsers) {
            res.status(200).json(findUsers);
        } else {
            res.status(404).json({ errorMessage: 'No Users Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.params.id });
        if (findUser) {
            res.status(200).json(findUser);
        } else {
            res.status(404).json({ errorMessage: 'No Users Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.signUp = async (req, res) => {
    try {
        const ifEmailAlreadyPresent = await User.findOne({ email: req.body.email });
        if (ifEmailAlreadyPresent) {
            res.status(201).json({ errorMessage: 'Email already exists. Please try another one.' });
        }
        else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hash
            });

            const saveUser = await user.save();
            if (saveUser) {
                res.status(200).json({ successMessage: 'Account created successfuly!. Please Sign in.' });
            } else {
                res.status(400).json({ errorMessage: 'Account not created. Please try again' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.login = async (req, res) => {
    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            const checkPassword = bcrypt.compareSync(req.body.password, findUser.password);
            if (checkPassword) {
                const payload = {
                    user: {
                        _id: findUser._id,
                        role: findUser.role
                    }
                }
                jwt.sign(payload, config.JWT_SECRET, (err, token) => {
                    if (err) res.status(400).json({ errorMessage: 'Jwt Error' })
                    else {
                        delete findUser["password"];
                        delete findUser["resetToken"];
                        delete findUser["expireToken"];
                        res.status(200).json({
                            user: findUser,
                            token,
                            successMessage: 'Logged In Successfully',

                        });
                    }
                });
            } else {
                res.status(201).json({ errorMessage: 'Incorrect username or password.' })
            }
        }
        else {
            res.status(201).json({ errorMessage: 'Incorrect username or password.' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.updateUser = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.params.id });
        if (findUser) {
            findUser.email = req.body.email;
            findUser.firstName = req.body.firstName;
            findUser.lastName = req.body.lastName;
            findUser.gender = req.body.gender;
            findUser.phone = req.body.phone;
            findUser.birthday = req.body.birthday;

            const saveUser = await findUser.save();
            if (saveUser) {
                delete saveUser["password"];
                delete saveUser["resetToken"];
                delete saveUser["expireToken"];

                res.status(200).json({ successMessage: 'User Updated Successfully', user: saveUser })
            } else (
                res.status(400).json({ errorMessage: 'User could not be Updated.' })
            )
        } else {
            res.status(404).json({ errorMessage: 'User code not found.' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirm } = req.body;
    try {
        const findUser = await User.findOne({ _id: req.user?._id });
        if (findUser) {
            const checkPassword = bcrypt.compareSync(oldPassword, findUser.password);
            if (checkPassword) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(newPassword, salt);

                findUser.password = hash;
                await findUser.save();
                res.status(200).json({ successMessage: 'Password updated successfuly!' });
            } else {
                res.status(201).json({ errorMessage: 'Incorrect old password.' })
            }

        } else {
            res.status(201).json({ errorMessage: 'Incorrect old password.' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


/****************************************************** Forgot Password ***********************************************/
exports.resetPasswordLink = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email input
        if (!email) {
            return res.status(400).json({ errorMessage: 'Email is required' });
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errorMessage: 'Email does not exist' });
        }

        // Update user with reset token
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000; // 1 hour expiry

        await user.save();

        // Generate reset URL
        const baseUrl = process.env.NODE_ENV === 'production'
            ? process.env.FRONTEND_URL
            : 'http://localhost:3000';
        const resetUrl = `${baseUrl}/reset-password/${token}`;

        // Send email
        await sendEmail(
            email, 
            'Reset Password Link',
            `<p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>
             <p>This link will expire in 1 hour.</p>
             <p>If you didn't request this, please ignore this email.</p>`
        );

        res.status(200).json({ 
            successMessage: 'Password reset link sent! Check your inbox.'
        });

    } catch (error) {
        console.error('Reset password link error:', error);
        res.status(500).json({
            errorMessage: 'An error occurred while processing your request'
        });
    }
};

/****************************************************** Update Password ***********************************************/
exports.updatePassword = async (req, res) => {
    try {
        const { password, confirm, token } = req.body;

        // Validate inputs
        if (!password || !confirm || !token) {
            return res.status(400).json({
                errorMessage: 'All fields are required'
            });
        }

        if (password !== confirm) {
            return res.status(400).json({
                errorMessage: 'Passwords do not match'
            });
        }


        // Find user with valid token
        const user = await User.findOne({
            resetToken: token,
            expireToken: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                errorMessage: 'Invalid or expired reset token. Please request a new one.'
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;

        await user.save();

        res.status(200).json({
            successMessage: 'Password updated successfully! You can now login with your new password.'
        });

    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            errorMessage: 'An error occurred while updating your password'
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findById({ _id: req.params.id })
        if (deleteUser) {
            deleteUser.remove();
            res.status(200).json({ successMessage: `User has been deleted successfully` });
        } else {
            res.status(400).json({ errorMessage: 'User could not be deleted. Please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}