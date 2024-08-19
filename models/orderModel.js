const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    userId: {
        type: String,
    },
    billingAddress: {
        type: Object,
    },
    shippingAddress: {
        type: Object,
    },
    paymentData: {
        type: Object,
        default: {}
    },
    products: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: "1"
    },
    discount: {
        type: String,
        default: ''
    },
    subTotal: {
        type: String,
        default: ''
    },
    shipping: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    placed: {
        type: String,
        required: true
    },
    statusUpdateTime: {
        type: String,
        default: "---"
    },
    notes: {
        type: String
    }
}, { timestamps: true }
);

const orderModel = new mongoose.model('Order', orderSchema);
module.exports = orderModel;
