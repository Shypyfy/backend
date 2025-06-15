const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = WalletSchema;