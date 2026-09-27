const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {createOrder,getOrder,myOrders,updateOrderStatus}= require("../controllers/orderControllers");
const router = express.Router();

router.route('/').post(protect,createOrder).get(protect,admin,getOrder);
router.route('/myorders').get(protect , myOrders);
router.route('/:id/status').put(protect, admin, updateOrderStatus)

module.exports = router;