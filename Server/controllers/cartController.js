const Cart = require('../models/cart');
const factory = require('../utils/handleFactory');

exports.getAllCarts = factory.getAll(Cart, {path: 'customerId'}) //need costumer ID linked to every cart
exports.getOneCart = factory.getOneById(Cart, {path: 'customerId'})
exports.createCart = factory.createOne(Cart)
exports.updateOneCart = factory.updateOne(Cart)
exports.deleteOneCart = factory.deleteOne(Cart)