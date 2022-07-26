const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

router
    .route('/')
    .get( productController.getAllProducts )
    .post( productController.createOneProduct )
router
    .route('/single/:id')
    .get( productController.getOneProduct )
    .put( productController.updateOneProduct )
    .delete( productController.deleteOneProduct )
router
    .route('/category')
    .get( categoryController.getAllCategories )
    .post( categoryController.createOneCategory )
router
    .route('/category/single/:id')
    .get( categoryController.getOneCategory )
    .put( categoryController.updateOneCategory )
    .delete( categoryController.deleteOneCategory )

module.exports = router;