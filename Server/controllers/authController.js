const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const tryCatch = require('../utils/tryCatch');

function generateAccessToken (user) {
    delete user.password
    console.log(user)
    return jwt.sign(user, process.env.JWT_SECRET)
}

exports.register = tryCatch(async (req, res, next) => {
    const {password} = req.body;
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword;

    const user = await User.create(req.body)
    const token = generateAccessToken(user._doc)
    const newUserInfo = user._id 
    res.cookie('token', token)
    res.status(201).json({
        status: 'success',
        userId: newUserInfo,
        token
    })

})

exports.login = tryCatch (async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next(new AppError('Please provide username and password'), 401) 
    }
    const user = await User.findOne({ username })
    if (user === null ) {
        next(new AppError('username or password invalid'), 401) 
    }
    const doesPasswordMatch = await bcrypt.compare( password, user.password )
    if (doesPasswordMatch === false ) {
        next(new AppError('username or password invalid'), 401) 
    }
    const token = generateAccessToken(user._doc);
    res.cookie('token', token)
    if ( user.admin ) {
        res.status(200).json({
            status: 'success',
            token,
            user: user,
            admin: true
        })
    }
    res.status(200).json({
        status: 'success',
        token,
        user: user,
        admin: false
    })
})

exports.logout = tryCatch (async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).json({
        status: 'success',
        message: 'logged out successfully'
    })     

})