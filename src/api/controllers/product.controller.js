
const { default: mongoose } = require('mongoose');
const productModel = require("../models/product.model");

exports.getAllProducts =async (req, res, next) =>{
    try{
        const results= await productModel.find({}).select('name price productImage');
        const response ={
            count: results.length,
            products: results,
        }
        
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.addProduct = async (req, res, next) =>{
    try{
        console.log(req.file);
        const product = await productModel.create({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: parseInt(req.body.price),
            productImage: req.file.path
        })
        if(product){
            return res.status(200).json({
                message:"adding a product",
                createdProduct:product
            })
        }
    }catch(err){
        console.error(err)
        res.status(500).json({
            error: err
        });
    }
}

exports.getProductById =async (req, res, next) =>{
    const id = req.params.productId;
    console.log(id);
    try{
        const result = await productModel.findById(id);
        if(result){
            res.status(200).json(result);
        }else {
            res.status(404).json({
                message: "404 not found"
            })
        }
    }
   catch(err){
        console.error(err.message);
        res.status(500).json({
            error: err
        });
    }
}

exports.updateProduct =async (req, res, next) =>{
    const id = req.params.productId;
    const data = req.body;
    try {
        let product =await productModel.findById(id)
        if(!product){
            return res.status(404).json({
                message:"product does not exist!"
            })
        }
        product._doc ={...product._doc,...data}
        console.log(product,data);
        const productM = new ProductModel(product)
        const result = await productM.save();
        res.status(200).json({
            message:"Updated product!"
        })
    }catch(err){
        console.log(err.message);
        res.status(501).json({
            message:"bad request"
        })
    }
}

exports.deleteProduct = async(req, res, next) =>{
    const id = req.params.productId;
    try{
        await productModel.remove({_id:id},)
        res.status(200).json({
            message:`product with id ${id} deleted successfully`
        })
    }catch(err){
        console.log(err.message);
        res.status(404).json({
            message:`Product with id ${id} not found`
        })
    }
    
}