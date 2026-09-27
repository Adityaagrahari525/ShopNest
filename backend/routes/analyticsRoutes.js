const express = require('express');
const {protect } = require('../middleware/authMiddleware');
const admin = require("../middleware/adminMiddleware");
const router = express.Router();
const {getAdminStats}  = require("../controllers/analyticsController");

router.get('/',protect,admin,getAdminStats);

module.exports = router;
