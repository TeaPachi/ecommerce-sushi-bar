const res = require('express/lib/response');
const AppError = require('../utils/appError');
const tryCatch = require('./tryCatch');

exports.getAll = (Model, option) => tryCatch(async (req, res, next) => {
    let doc;
    if (option?.path && option?.path2){ 
        doc = await Model.find().populate(option.path).populate(option.path2)
    } else if (option?.path){
        doc = await Model.find().populate(option.path)
    } else {
        doc = await Model.find()
    }

    res.status(200).json({
        status: 'success',
        data: doc
    })
})

exports.createOne = (Model) => tryCatch (async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
        status: 'success',
        data: doc
    })
})

exports.getOneById = (Model, option) => tryCatch (async (req, res, next) => {
    let doc;
    if (option?.path){
        doc = await Model.findById(req.params.id).populate(option.path)
    } else {
        doc = await Model.findById(req.params.id)
    }
    if(!doc) {
        next(new AppError(`document with id ${req.params.id} not found`), 400) 
    }

    res.status(200).json({
        status: 'success',
        data: doc
    })
})

exports.deleteOne = (Model) => tryCatch(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc){
        return next(new AppError(`document with id ${req.params.id} not found`), 400) 
    }

    res.status(200).json({
        status: 'success',
        data: doc
    })
})

exports.deleteMany = (Model) => tryCatch(async (req, res, next) => {
    const doc = await Model.deleteMany({ cartId: { $eq: req.params.id}}) 
    if (!doc){
        return next(new AppError(`document with id ${req.body} not found`), 400) 
    }

    res.status(200).json({
        status: 'success',
        data: doc
    })
})

exports.updateOne = (Model) => tryCatch (async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    if (!doc) {
        return next(new AppError(`document with id ${req.params.id} not found`), 400) 
    }
    
    res.status(200).json({
        status: 'success',
        data: doc
    })
})
