const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'order must have a customer id']
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: [true, 'order must have a cart id']
    },
    subtotal: {
        type: Number,
        required: [true, 'order must have a subtotal price']
    },
    address: {
        type: String,
        required: [true, 'order must have a shipping address']
        //not Schema.Types.ObjectId from user cause we will have the input for a different address incase the user wants to
    },
    deliveryDate: {
        type: Date,
        default: Date.now,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        required: [true, 'order must have a payment method']
    },
})
//an order wil be made once the customer presses the final order button

const Order = model( 'Order', orderSchema );
module.exports = Order;