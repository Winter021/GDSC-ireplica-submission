const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const authenticate = require("../middleware/Authenticate");
// import { transporter, mailOptions, sendMail } from '../SendMail.js';
const { transporter, mailOptions, sendMail } = require('../SendMail.js');

require("../db/connection");
const Product = require('../model/productSchema');
const Transaction = require('../model/transactionSchema');

router.get('/',(req,res)=>{
    res.send(`This is the database server for the api, it is working `);
})

router.post('/getProduct',async(req,res)=>{

    // console.log("get prod fucntion")
    const {productHash} = req.body ;
    console.log(req.body);
    if(!productHash)
    {
        return res.status(422).json({error:"Enter a valid hash"}); 
    }
    const productExist = await Product.findOne({productHash:productHash});

    try{
    
        if(!productExist){
        return res.status(422).json({error:"No such product exists"});
        }
    }
    catch(err){ 
        console.log(err);
    }


    res.send(productExist);
});

router.post('/deleteProduct', async (req, res) => {
    const { productHash } = req.body;
    
    console.log("delete product producthas " , req.body);

    try {
        // Check if productHash is provided
        if (!productHash) {
            return res.status(422).json({ error: "Enter a valid hash" });
        }

        // Find the product with the provided hash
        const productToDelete = await Product.findOne({ productHash: productHash });

        // Check if the product exists
        if (!productToDelete) {
            return res.status(422).json({ error: "No such product exists" });
        }

        // Delete the product
        await Product.deleteOne({ productHash: productHash });

        // Optionally, you can send a success message
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/registerProduct',async(req,res)=>{

    console.log("req body : " ,req.body);

    const {manufacturerName,productName, ownerName, ownerEmail,imageLink, productId, productHash , transactionCount, price} = req.body ;
    
    if(!imageLink)
    {
        console.log("This field is missing image link");
    }
    if(!manufacturerName)
    {
        console.log("This field is missing manufcature name");
    }
    
    if(!ownerName)
    {
        console.log("owner name link missing");
    }
    if(!ownerEmail)
    {
        console.log(" owner email missing");
    }

    
    if(!productId)
    {
        console.log("This product id missing");
    }
    if(!productHash)
    {
        console.log("product has missing");
    }
    
    if(!transactionCount)
    {
        console.log("This field is missing transaction count");
    }
    if(!price)
    {
        console.log("This field is missing  price");
    }


    if( !manufacturerName || !productName || !ownerName || !ownerEmail || !imageLink || !productId || !productHash || !transactionCount || !price)
    {
        // console.log("HEre eroror");

        return res.status(422).json({error:"Please fill all the required fields"});   
    }

    const productExist = await Product.findOne({productHash});

    try{
    
        if(productExist){
        return res.status(422).json({error:"Product with same tokenHash already exists"});
    }

    const product = new Product({manufacturerName,productName, ownerName, ownerEmail,imageLink, productId, productHash , transactionCount, price});
    const productSave = await product.save()
        
    if(productSave)
    {
        console.log("Regsucc")
         res.status(201).json({message:"Product registration success"});
    }
    else 
     res.status(500).json({error:"Failed to register"});
    
    }

    catch(err){ 
        // if user.findOne failed
        console.log("Err ",err);
    }

})


router.post('/registerTransaction',async(req,res)=>{
    // console.log(req.body);

    const {productHash, fromName, fromEmail , ownerName,ownerEmail,otp,transactionHash,transactionStatus} = req.body ;

    // if(!productHash)
    // {
    //     console.log("Product hash missing")   
    // }

    // if(!fromEmail)
    // {
    //     console.log("from email missing")   
    // }

    // if(!fromName)
    // {
    //     console.log("from name missing")   
    // }

    // if(!transactionStatus)
    // {
    //     console.log(transactionStatus)
    //     console.log("transaction status  missing")   
    // }
    // if(!transactionHash)
    // {
    //     console.log("transaction hash missing")   
    // }
    // if(!otp)
    // {
    //     console.log("otp  missing")   
    // }

    if(!productHash || !fromName || !fromEmail || !ownerName ||!ownerEmail || !otp || !transactionHash || !transactionStatus)
    {
        return res.status(422).json({error:"Please fill all the required fields"});   
    }

    const transactionExist = await Transaction.findOne({fromEmail});

    try{
    
        if(transactionExist){
        return res.status(422).json({error:"You already have a pending transaction"});
    }

    const transaction = new Transaction({productHash, fromName, fromEmail , ownerName,ownerEmail,otp,transactionHash,transactionStatus,expiresAt: new Date(Date.now() + 180000)});
    const transactionSave = await transaction.save()
        
    if(transactionSave)
    {
       
        console.log("Regsucc")
        sendMail(otp, ownerEmail,transactionHash);
         res.status(201).send(
            {
                message:"Transaction registration success",           
                transactionHash:transaction.transactionHash,

            });
    
        }
    else 
     res.status(500).json({error:"Failed to register the transaction"});
    
    }

    catch(err){ 
        // if user.findOne failed
        console.log("Err ",err);
    }

})

router.post('/getTransaction',async(req,res)=>{
    const {transactionHash} = req.body ;
    console.log(req);
    if(!transactionHash)
    {
        return res.status(422).json({error:"Enter a valid hash"}); 
    }
    const transactionExist = await Transaction.findOne({transactionHash:transactionHash});

    try{
    
        if(!transactionExist){
        return res.status(422).json({error:"No such Transaction exists"});
        }
    }
    catch(err){ 
        console.log(err);
    }


    res.send(transactionExist);
})

router.post('/deleteTransaction', async (req, res) => {
    const { transactionHash } = req.body;
    
    console.log(req.body);

    try {
        // Check if transactionHash is provided
        if (!transactionHash) {
            return res.status(422).json({ error: "Enter a valid hash" });
        }

        // Find the transaction with the provided hash
        const transactionToDelete = await Transaction.findOne({ transactionHash: transactionHash });

        // Check if the transaction exists
        if (!transactionToDelete) {
            return res.status(422).json({ error: "No such transaction exists" });
        }

        // Delete the transaction
        await Transaction.deleteOne({ transactionHash: transactionHash });

        // Optionally, you can send a success message
        res.json({ message: "Transaction deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router ;