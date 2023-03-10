const express = require("express");
const cors = require("cors")
const product=require('./db/products')
const app = express();
const dotnev = require("dotenv").config();
require("./db/config")
const user = require("./db/user")

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("app is working")
})
app.post("/register", async (req, res) => {
    try {
        let data = req.body;
        if(!data){
            return res.status(400).send("please provide your details")
        }
        let insertData = await user.create(data);
        let User = {
            "_id": insertData._id,
            "name": insertData.name,
            "email": insertData.email
        }
        return res.status(201).send({ status: true, result: User })
    }
    catch (err) {
        return res.status(500).send(err)
    }
})

app.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email) {
            return res.status(400).send("please provide email address")
        }
        if (!password) {
            return res.status(400).send("please provide password")
        }
        let User = await user.findOne(req.body).select("-password");
        if (User) {
            return res.status(200).send(User)
        }
        else {
            return res.status(404).send({result:"user not found"})
        }
    }
    catch (err) {
        return res.status(500).send(err)
    }

})
app.post("/add-product",async (req,res)=>{
    try {
        let data = req.body;
        if(!data){
            return res.status(400).send("please provide product details")
        }
        let insertProduct = await product.create(data);
       
        return res.status(201).send({ status: true, result: insertProduct })
    }
    catch (err) {
        return res.status(500).send(err)
    }

    
})
app.get("/get-product",async (req,res)=>{
    try {
        let products = await product.find();
        if(products.length>0){
            return res.status(200).send(products)
        }
        else{
            return res.status(404).send({result:'no result found'})
        }
        
    } catch (error) {
        return res.status(500).send(error)
        
    }
})
app.delete("/product/:id",async(req,res)=>{
    try{
    let id=req.params.id;
    const result=await product.deleteOne({_id:id})
    return res.status(200).send(result)
    }
    catch(err){
        return res.status(500).send({status:false,message:err})
    }
})


app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log(`CONNECTED TO SERVER SUCCESSFULLY IN `)
    }
})