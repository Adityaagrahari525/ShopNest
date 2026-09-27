const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user :{type : mongoose.Schema.Types.ObjectId ,ref : 'User', required : true},
    products : [
        {
            productId  :{type : mongoose.Schema.Types.ObjectId , ref : 'product' , required : true},
            quantity : {type :Number , required  :true,min : 1}
        }
    ],
    totalAmount :  {type : String ,required : true},
    addresss : {
        fullname : {type : String , req :true},
        street : {type : String , req :true},
        city : {type : String , req :true},
        posatlCode : {type : String , req :true},
        country : {type : String , req :true}
    },
    paymentId: {type : String },
    status : { type : String , enum : ['pending','shipped','delivered'],default : 'pending'}
},{timestamps  :true});

module.exports = mongoose.model('order',orderSchema);