const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: false,
    },
    height: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    currentOwner: {
        type: String,
        required: false,
    },
    PreviousOwner: {
        type: String,
        required: false,
    },
    Owners: {
        type: [String],
        required: false,
    },
});

module.exports = mongoose.model('Product', ProductSchema);
