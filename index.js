const express = require("express");
const cors=require("cors")
const user = require("./db/user");
const app = express();
require("./db/config")
require('./db/user')
app.use(express.json())
app.use(cors())
const dotnev = require("dotenv").config()
app.get("/",(req,res)=>{
    res.send("app is working")
})
app.post('/register',async(req,res)=>{
    let data=req.body;
    let newdata=await user.create(data)
    return res.status(201).send({status:true,data:newdata})
})

app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`CONNECTED TO SERVER SUCCESSFULLY IN` )
    }
})
