const { Schema, model } = require('mongoose');

const cartProductSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'product in cart must contain product id']
    },
    quantity: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: [true, 'cart\'s product must have a total price (product price * quantity)']
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: [true, 'cart products must have a cart Id']
    },
})

const CartProduct = model( 'CartProduct', cartProductSchema)
module.exports = CartProduct;