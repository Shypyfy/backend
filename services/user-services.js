const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const createUser = async (data) => {
    const existing = await User.findOne({ username: data.username });
    if (existing) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
        ...data,
        password: hashedPassword,
    });

    return await newUser.save();
};

const getAllUsers = async () => {
    return await User.find().select("-password");
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
    ).select("-password");
};

const deleteUser = async (username) => {
    return await User.findOneAndDelete({ username });
};

const validateUserCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserByWalletAddress,
    getUserByNIC,
    updateUserWallet,
    deleteUser,
    validateUserCredentials,
};
