const { Schema, model } = require('mongoose');


const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: [true, 'user already has a cart'],
        required: [true, 'cart must have a consumer id tied to it'],
    },
    creationDate: {
        type: Date,
        default: Date.now,
    }
})

const Cart = model( 'Cart', cartSchema )
module.exports = Cart;