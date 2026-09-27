const express = require("express");

const {protect} = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {getproducts, createProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/productController");
const multer  = require('multer');
const upload = multer({dest : 'uploads/'});

const router = express.Router();

router.route('/').get(getproducts).post(protect,admin , upload.single('image') ,createProduct);
router.route('/:id').get(getProductById).put(protect,admin,upload.single('image') ,updateProduct).delete(protect,admin,upload.single('image') ,deleteProduct);

module.exports = router;