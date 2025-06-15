const mongoose = require('mongoose');
const WalletSchema = require('./wallet-model');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: WalletSchema,
        required: false
    },
    walletaddress: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('User', UserSchema);
