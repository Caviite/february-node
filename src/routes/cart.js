const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, removeFromCart } = require('../contoller/cart');

router.post('/add', addToCart);
router.get('/', getCartItems);
router.delete('/remove/:id', removeFromCart);