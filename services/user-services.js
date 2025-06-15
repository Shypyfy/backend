const User = require("../models/user-model");

const createUser = async (data) => {
    const newUser = new User(data);
    return await newUser.save();
};

const getAllUsers = async () => {
    return await User.find();
};

const getUserByUsername = async (username) => {
    return await User.findOne({ username });
};

const getUserByWalletAddress = async (walletaddress) => {
    return await User.findOne({ walletaddress });
};

const getUserByNIC = async (nic) => {
    return await User.findOne({ nic });
};

const updateUserWallet = async (username, walletData) => {
    return await User.findOneAndUpdate(
        { username },
        { wallet: walletData },
        { new: true }
    );
};

const deleteUser = async (username) => {
    return await User.findOneAndDelete({ username });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserByWalletAddress,
    getUserByNIC,
    updateUserWallet,
    deleteUser
};
