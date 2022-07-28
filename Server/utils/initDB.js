const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');

const createAdmin = async () => {
    try {
        await User.create({
            admin: true,
            firstName: "Garrison",
            lastName: "Lovington",
            username: "Tester123",
            email: "test123@test.com",
            password: "$2b$10$U5Mh8K7nPtIdIsE1oBGFYOlvo9ZjDebzMAvV4tpVsvDq6X6sEbuhS",
        })

    } catch (error) {
        console.log(error)
    }
}

const createProducts = async () => {
    try {
        await Category.create([{        
            categoryName: "Sushi"
        },{
            categoryName: "Main Dishes"
        },{
            categoryName: "Drinks"
        },{
            categoryName: "Party Platters"
        }])

        await Product.create([{
            productName: "Veggie Roll",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 25,
            image: "images/thumbnails/VeggieRoll.jpg",
            hot: false,
            new: false
        },{
            productName: "Maki Roll",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 30,
            image: "images/thumbnails/MakiRoll.jpg",
            hot: true,
            new: false
        },{
            productName: "Nigiri Salmon",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 29,
            image: "images/thumbnails/NigiriSalmon.jpeg",
            hot: false,
            new: false
        },{
            productName: "Sushi Sandwich",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 36,
            image: "images/thumbnails/SushiSandwich.jpg",
            hot: true,
            new: false
        },{
            productName: "Chicken Wok",
            category: "62bed8eedf2fec53913a0d20",
            price: 65,
            image: "images/thumbnails/ChickenWok.jpeg",
            hot: false,
            new: true
        },{
            productName: "Beef Wok",
            category: "62bed8eedf2fec53913a0d20",
            price: 70,
            image: "images/thumbnails/BeefWok.jpeg",
            hot: false,
            new: true
        },{
            productName: "Yakitori BBQ",
            category: "62bed8eedf2fec53913a0d20",
            price: 58,
            image: "images/thumbnails/yakitoriBBQ.jpeg",
            hot: true,
            new: false
        },{
            productName: "Yakitori Tariaki",
            category: "62bed8eedf2fec53913a0d20",
            price: 58,
            image: "images/thumbnails/YakitoriTariaki.jpeg",
            hot: true,
            new: false
        },{
            productName: "Spicy Crab Roll",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 39,
            image: "images/thumbnails/SpicyCrabRoll.jpg",
            hot: true,
            new: false
        },{
            productName: "California Roll",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 39,
            image: "images/thumbnails/CaliforniaRoll.jpeg",
            hot: false,
            new: false
        },{
            productName: "Crispy Maki",
            category: "62bdbca5ef988b6f8edd2d87",
            price: 30,
            image: "images/thumbnails/CrispyMaki.jpg",
            hot: false,
            new: false
        },{
            productName: "Coca-Cola",
            category: "62c08151d7ae55113f68d590",
            price: 5,
            image: "images/thumbnails/coca-cola.png",
            hot: true,
            new: false
        },{
            productName: "Water",
            category: "62c08151d7ae55113f68d590",
            price: 3,
            image: "images/thumbnails/water.jpg",
            hot: false,
            new: false
        },{
            productName: "Coca-Cola 1 liter",
            category: "62c08151d7ae55113f68d590",
            price: 12,
            image: "images/thumbnails/coca-cola-liter.jpg",
            hot: false,
            new: false
        },{
            productName: "Fruit Tray",
            category: "62c73b53432d3c080dfe0027",
            price: 55,
            image: "images/thumbnails/FruitTray.jpg",
            hot: false,
            new: false
        },{
            productName: "Hybrid Tray",
            category: "62c73b53432d3c080dfe0027",
            price: 59,
            image: "images/thumbnails/HybridTray.jpg",
            hot: false,
            new: true
        }])
    } catch (error) {
        console.log(error)
    }
}

const initDB = async () => {
    try {
        await createAdmin();
        await createProducts();
    } catch (error) {
        console.log(error)
    }
}

module.exports = initDB;