import express from 'express'
import User from "../models/User"
import bcrypt from "bcryptjs"
const route=express.Router()
route.post("/register",
async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if (user)
    return res.send("User with given email is existing!")
user= new User({
    fullname:req.body.fullname,
    email:req.body.email,
    password:await bcrypt.hash(req.body.password,10),
}).save()
res.send(user)

})