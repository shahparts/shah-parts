const Order = require('../models/orderModel');
const Template = require('../email-template');
const sendEmail = require('../nodemailer');
const config = require('../config/keys');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getAllCompletedOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: '5' }).sort({ createdAt: -1 });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.getAllCustomerOrdersById = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getAllOrderById = async (req, res) => {
    try {
        const orders = await Order.findOne({ _id: req.params.id });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.placeOrder = async (req, res) => {
    try {
        const { cartProducts, user, paymentData, placed, billingAddress, shippingAddress, totalAmount, subTotal, shipping, notes, paymentMethod, userId, email } = req.body;
        const order = new Order({
            user,
            products: cartProducts,
            user: {
                name: user?.fullName,
                email: email
            },
            paymentData,
            userId,
            placed,
            notes,
            billingAddress,
            shippingAddress,
            subTotal,
            shipping,
            totalPrice: totalAmount,
            paymentMethod
        });
        await order.save(async (err, result) => {
            if (err) { console.log('Payment Failed', err) }
            if (result) {
                if (email) {
                    sendEmail(email, "Your order is placed!", Template({ orderId: result._id, name: user?.fullName ? user?.fullName : user?.email }))
                }
                sendEmail(config?.EMAIL, "Your order is placed!", Template({ orderId: result._id, name: user?.fullName ? user?.fullName : user?.email }))
                res.status(200).json({ successMessage: 'Successfully Purchased Items!' });
            } else {
                console.log('error');
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.setOrderStatus = async (req, res) => {
    try {
        let getStatus = req.body.status == '2' ?
            `Confirmed`
            :
            req.body.status == '3' ?
                `Prepared`
                :
                req.body.status == '4' ?
                    `Out for delivery`
                    :
                    req.body.status == '5' ?
                        `Complete`
                        :
                        null;
        const order = await Order.findOne({ _id: req.body.orderId });
        if (order) {
            order.status = req.body.status
            order.statusUpdateTime = req.body.updateTime
            order.save(async (error, result) => {
                console.log(error);
                if (error) {
                    res.status(400).json({ errorMessage: 'Status update failed!' });
                }
                if (result) {
                    // await sendEmail(result.user.email, "You've got order updates!", Template({ orderId: result._id, name: order?.user?.fullName ? order?.user?.fullName : order?.user?.email, orderStatus: getStatus }))
                    res.status(200).json({ successMessage: 'Order status updated successfully!' });
                }
            })
        } else {
            res.status(404).json({ errorMessage: 'No order found!' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

