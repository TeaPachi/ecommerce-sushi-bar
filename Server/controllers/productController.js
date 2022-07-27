const Product = require('../models/product');
const factory = require('../utils/handleFactory');

exports.getAllProducts = factory.getAll(Product, {path: 'category'})
exports.getOneProduct = factory.getOneById(Product, {path: 'category'})
exports.createOneProduct = factory.createOne(Product)
exports.deleteOneProduct = factory.deleteOne(Product)
exports.updateOneProduct = factory.updateOne(Product)
