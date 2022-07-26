const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const cartProductController = require('../controllers/cartProductController');

router
    .route('/')
    .get( cartController.getAllCarts )
    .post( cartController.createCart )
router
    .route('/single/:id')
    .get( cartController.getOneCart )
    .put( cartController.updateOneCart )
    .delete( cartController.deleteOneCart )
router
    .route('/cartProduct')
    .get( cartProductController.getAllCartProducts )
    .post( cartProductController.createOneCartProduct )
router
    .route('/cartProduct/single/:id')
    .get( cartProductController.getOneCartProduct )
    .put( cartProductController.updateOneCartProduct )
    .delete( cartProductController.deleteOneCartProduct )
router
    .route('/cartProduct/many/:id')
    .delete( cartProductController.deleteManyCartProducts )

module.exports = router;