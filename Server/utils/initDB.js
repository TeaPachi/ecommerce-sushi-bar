const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');
const CartProduct = require('../models/cartProduct');
const Cart = require('../models/cart');
const Order = require('../models/order');

const createAdmin = async () => {
    try {
        const admin = new User({
            admin: true,
            firstName: "Garrison",
            lastName: "Lovington",
            username: "Tester123",
            email: "test123@test.com",
            password: "123456",
        })
        await admin.save();
    } catch (error) {
        console.log(error)
    }
}

const createCategories = async () => {
    try {
        const sushi = new Category({
            categoryName: "Sushi"
        })
        await sushi.save();

        const mainDish = new Category({
            categoryName: "Main Dishes"
        })
        await mainDish.save();

        const drinks = new Category({
            categoryName: "Drinks"
        })
        await drinks.save();

        const partyPlatters = new Category({
            categoryName: "Party Platters"
        })

        await partyPlatters.save();

    } catch (error) {
        console.log(error)
    }
}

const createProducts = async () => {
    try {
        const veggieRoll = new Product({
            productName: "Veggie Roll",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 25,
            image: "images/thumbnails/VeggieRoll.jpg",
            hot: false,
            new: false
        })
        await veggieRoll.save();

        
    } catch (error) {
        console.log(error)
    }
}