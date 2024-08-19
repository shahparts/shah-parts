const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
    Title: {
        type: String,
        // required: true
    },
    Price: {
        type: Number,
        // required: true
    },
    Featured: { type: String, default: "no" },
    Description: { type: String },
    Make: { type: String },
    CategoryImage: { type: String },
    BrandImage: { type: String },
    Model: { type: String },
    Part: { type: String },
    PartAccessorries: { type: String },
    Location: { type: String },
    Condition: { type: String },
    ModelCode: { type: String },
    Registrationyear: { type: String },
    Mileage: { type: String },
    Missiontype: { type: String },
    Enginemodel: { type: String },
    Enginesize: { type: String },
    Fuel: { type: String },
    Frive: { type: String },
    AutoPartsMaker: { type: String },
    GenuinePartsNo: { type: String },
    ChassisNo: { type: String },
    RefNo: { type: String },
    GearType: { type: String },
    Pictures: { type: [String], required: true },
    Reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        review: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
    }]
}, { timestamps: true });

const productModel = new mongoose.model('Product', productShema);
module.exports = productModel; 