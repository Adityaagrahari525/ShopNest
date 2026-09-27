const Order = require("../models/order")
const sendEmail = require("../utils/sendEmail");

const createOrder = async (req,res) => {
    try{
        const {items , totalAmount , address , paymentId} = req.body;
        if(!items || items.length ===  0 || !totalAmount || !address){
            res.status(400).json({message : "invalid order data"});

        }
        else{
            const order = new Order({
                user : req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            await order.save();
            const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully placed. Here are the details:\n\nOrder ID: ${order._id}\nTotal Amount: ${totalAmount}\nShipping Address: ${address }, \n\nWe will notify you once your order is shipped.\n\nThank you for shopping with us!\n\nBest regards,\nShopNest Team`;

            await sendEmail(req.user.email , 'order Created' ,message);
            res.status(201).json({message : "order created successfully", order});
        }
    }catch(error){
        res.status(400).json({message : 'errroe sending mail', error})
    }

};


const myOrders = async (req,res)  =>{
    try{
        const orders = await Order.find({user : req.user._id}).populate('items.productId', 'name price')
        res.json(orders);
    }catch(error){
        res.status(400).json({message  : "errro ferching orders", error});
    }
};


const getOrder = async (req,res) => {
    try {
        const order = await Order.find({}).populate('user', 'id name');
        res.json(order);
    }catch(error){
        res.status(400).json({message : 'error fetching orders',error });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: 'Order status updated', order });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};


module.exports = {createOrder,getOrder,myOrders,updateOrderStatus};



 