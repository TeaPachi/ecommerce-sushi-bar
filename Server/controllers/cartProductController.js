const CartProduct = require('../models/cartProduct');
const factory = require('../utils/handleFactory');

exports.getAllCartProducts = factory.getAll(CartProduct, {path: 'cartId', path2: 'productId'})
exports.getOneCartProduct = factory.getOneById(CartProduct, {path: 'cartId', path2: 'productId'})
exports.createOneCartProduct = factory.createOne(CartProduct)
exports.updateOneCartProduct = factory.updateOne(CartProduct)
exports.deleteOneCartProduct = factory.deleteOne(CartProduct)
exports.deleteManyCartProducts = factory.deleteMany(CartProduct)