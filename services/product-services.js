const Product = require("../models/product-model");

const createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const getProductByCode = async (code) => {
    return await Product.findOne({ code });
};

const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCode,
    updateProduct,
    deleteProduct
};
