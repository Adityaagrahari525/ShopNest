const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name : { type: String , required : true},
    price : { type: Number , required : true},
    description : { type: String , required : true},
    category : {type : String , required  : true},
    stock  :{type : Number , default : 0},
    imageUrl  :{type : String },
    rating : {type  :Number ,default : 0},
    createdAt : {type : Date , default : Date.now},
    numReviews : {type : Number , default : 0}

});

const Product = mongoose.model("Product" , productSchema);

module.exports = Product;