const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
app.use(express.json());
const PORT = process.env.PORT ;

require("./db/connection");
const Product = require('./model/productSchema');
app.use(require('./router/auth'));




app.get('/',(req,res)=>{
    res.send("Homepage");
})

app.listen(PORT , ()=>{
    console.log(`Server is running at port no ${PORT}`)
});