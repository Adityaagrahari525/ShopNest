const order = require('../models/order');
const user = require('../models/User');
const product = require('../models/product');

const getAdminStats = async (req,res) =>{
    try{
        const totalUsers = await user.countDocuments({role : 'user'});
        const totalOrders = await order.countDocuments({});
        const totalProducts = await product.countDocuments({});

        const orders = await order.find({});
        const totalRevenueData = orders.reduce((acc ,order) => acc + order.totalAmount,0 )

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue : totalRevenueData 
        });
    }catch(error){
        res.status(400).json({message : 'erro fetching stats',error})
    }
};

module.exports = {getAdminStats};