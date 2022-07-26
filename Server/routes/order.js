const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router
    .route('/')
    .get( orderController.getAllOrders )
    .post( orderController.createOneOrder )
router
    .route('/single/:id')
    .get( orderController.getOneOrder )
    .put( orderController.updateOneOrder )
    .delete( orderController.deleteOneOrder )

module.exports = router;