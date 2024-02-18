const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transactionSchema = new mongoose.Schema({
    
    productHash:{
        type:String,
        required:true,
    },
    fromName:{
        type:String,
        required:true,
    },
    
    fromEmail:{
        type:String,
        required:true,
    },
    ownerName:{
        type:String,
        required:true,
    },
    
    ownerEmail:{
        type:String,
        required:true,
    },
    
    otp:{
        type:Number,
        required:true,
    },
    
    
    transactionHash:{
        type:String,
        required:true,
    },
    
    transactionStatus:{
        type:Boolean,
        required:true,
    },
    expiresAt: { 
        type: Date, 
        default: Date.now, 
        expires: 180,
    },
})


// hash the OTP

// hashing the password
// we are using pre to call it before our user.save() function
// userSchema.pre('save', async function(next){
//     // console.log("PRE METHOD Called");
//     if(this.isModified('password'))
//     {
//         this.password = bcrypt.hashSync(this.password,12);
//         // console.log(this.password);
//         this.cpassword = bcrypt.hashSync(this.cpassword,12);
//     }
//     next();
// })



// creating a model : creating a collection

const Transaction = mongoose.model('Transaction',transactionSchema);

module.exports = Transaction; 