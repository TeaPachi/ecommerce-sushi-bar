const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        required: [true, 'category must have a name']
    },
})


const Category = model('Category', categorySchema);
module.exports = Category;