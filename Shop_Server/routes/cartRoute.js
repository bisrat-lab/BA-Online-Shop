const express = require('express');
const router = express.Router();
const userController = require('../Controllers/usersController')
const cartController = require('../Controllers/cartControllers')

router.get('/carts/:username',userController.authorizeUsername, cartController.listItemCart);
router.post('/carts/:username', userController.authorizeUsername,cartController.addItemInCart);
router.delete('/carts/:username/:pid', cartController.removeCartItem);
router.get('/total/:username', cartController.totalAmount);
router.get('/checkout/:username', cartController.checkOut)

module.exports= router;