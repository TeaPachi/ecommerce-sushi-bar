const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        unique: [true, 'product name already exists'],
        required: [true, 'product must have a name']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'product must have a category']
    },
    price: {
        type: Number,
        required: [true, 'product must have a price'],
        min: [1, 'price cannot be less than 1'],
        max: [150, 'price cannot be greater than 150']
    },
    image: {
        type: String,
        required: [true, 'product must have an image'],
    },
    hot: {
        type: Boolean,
        default: false,
    },
    new: {
        type: Boolean,
        default: false,
    }
})

const Product = model('Product', productSchema)
module.exports = Product;