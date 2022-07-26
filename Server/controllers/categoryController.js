const Category = require('../models/category');
const factory = require('../utils/handleFactory');

exports.getAllCategories = factory.getAll(Category)
exports.getOneCategory = factory.getOneById(Category)
exports.createOneCategory = factory.createOne(Category)
exports.deleteOneCategory = factory.deleteOne(Category)
exports.updateOneCategory = factory.updateOne(Category)