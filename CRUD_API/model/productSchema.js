const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const productSchema = new mongoose.Schema({
    
    manufacturerName:{
        type:String,
        required:true,
    },

    productName:{
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

    imageLink:{
        type:String,
        required:true,
        default:"/nolinkprovided",
    },

    productId:{
        type:Number,
        required:true,
    },
    productHash:{
        type:String,
        required:true,
    },

    transactionCount:{
        type:Number,
        required:true,
    },

    price:{
        type:Number,
        required:true,
    },
 
})




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

const Product = mongoose.model('PRODUCT',productSchema);

module.exports = Product; 