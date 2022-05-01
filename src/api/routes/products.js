const express = require('express');
const { default: mongoose } = require('mongoose');

const productRoute = express.Router();
const ProductModel = require('../models/product.model')


productRoute.get('/',async (req, res, next) =>{
    try{
        const results= await ProductModel.find({})
        res.status(200).json(results);

    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
})

productRoute.post('/',async (req, res, next) =>{
    try{
        const product = await ProductModel.create({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: parseInt(req.body.price),
        })
        res.status(200).json({
            message:"adding a product",
            createdProduct:product
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            error: err
        });
    }
})

productRoute.get('/:productId',async (req, res, next) =>{
    const id = req.params.productId;
    console.log(id);
    try{
        const result = await ProductModel.findById(id).exec()
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
})

productRoute.patch('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message:"Updated product!"
    })
})


productRoute.delete('/:productId',(req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message:"Delete product!"
    })
})

module.exports = productRoute;