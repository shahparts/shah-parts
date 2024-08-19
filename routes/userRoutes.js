const express = require('express');
const upload = require('../middlewares/multer');
const { AuthenticatorJWT, isAdmin } = require('../middlewares/authenticator');
const { getAllUsers, getUserById, changePassword, resetPasswordLink, updatePassword, signUp, login, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', AuthenticatorJWT, isAdmin, getAllUsers);
router.get('/get/:id', getUserById);
router.post('/signup', signUp);
router.post('/login', login);
router.put('/update/:id', AuthenticatorJWT, updateUser);
router.put('/change-password', AuthenticatorJWT, changePassword);

router.post('/send/forgot-email', resetPasswordLink);
router.put('/reset-password', updatePassword);

router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteUser);

module.exports = router; 