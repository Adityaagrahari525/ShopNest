const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');

const getproducts = async(req,res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    }catch (error){
        res.status(500).json({message : "Error fetching products"});
    }
}


const getProductById = async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message : "Product not found"});
        }
    }catch(error){
        res.status(404).json({message  : "Product not found"});
    }
}


const createProduct = async(req,res)=>{
    try{
        const {name , description ,price, category ,stock} =  req.body;
        let imageUrl = "";
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            imageUrl = result.secure_url;
        }
        const product = new Product({
            name,
            description,
            price,
            category ,
            stock,
            imageUrl
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    }catch(error){
        res.status(500).json({message : "Error creating product", error: error.message});
    }
};

const updateProduct = async(req,res) =>{
    try{
        const {name , description ,price, category ,stock} =  req.body;
        const product = await Product.findById(req.params.id);
        if(product){
            product.name = name || product.name ;
            product.description = description || product.description ;
            product.price = price || product.price ; 
            product.category = category || product.category ;
            product.stock = stock || product.stock ;
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        }
        else{
            res.status(404).json({message : "Product not found"});
        }
    }catch(error){
        res.status(500).json({message : "Error updating product", error: error.message});
    }
};


const deleteProduct = async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.status(200).json({message : "Product deleted"});
        }else{
            res.status(404).json({message : "Product not found"});
        }
    }catch(error){
        res.status(500).json({message : "Error deleting product"});
    }
}

module.exports = {
    getproducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
