require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utils/connectDB');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');
const initDB = require('./utils/initDB');


// Run to initialize project with products and a user:
// initDB();

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.send('test')
})

//ROUTES
app.use('/product', require('./routes/product')) //product categories inside
app.use('/auth', require('./routes/auth'))
app.use('/cart', require('./routes/cart')) //cart products inside
app.use('/order', require('./routes/order'))

app.all('*', (req, res, next) => {
    next(new AppError('page not found'), 404)
})

app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app running on port ${PORT}`));