const express = require('express');
const { getProduct, addProduct, updateProduct, getSingleProduct } = require('../contoller/product');
const router = express.Router();
const authenticate = require('../middleware/token');
const { checkRole } = require("../middleware/adminRole");
const { upload } = require('../middleware/multer');


router.get('/', getProduct);
router.post('/', authenticate, checkRole, upload.single("image"), addProduct);
router.put('/:id', authenticate, checkRole, updateProduct);
router.get('/:id', authenticate, getSingleProduct); 

module.exports = router;