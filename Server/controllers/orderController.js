const Order = require('../models/order');
const factory = require('../utils/handleFactory');
const tryCatch = require('../utils/tryCatch');

exports.getAllOrders = factory.getAll(Order, { path: 'customerId', path2: 'cartId'})
exports.getOneOrder = factory.getOneById(Order, { path: 'customerId', path2: 'cartId'})
exports.createOneOrder = factory.createOne(Order)
exports.updateOneOrder = factory.updateOne(Order)
exports.deleteOneOrder = factory.deleteOne(Order)
