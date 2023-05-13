import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,require:true,
    },
    email:{
        type:String,require:true,unique:true
    },
    password:{
        type:String,require:true,
    },
})
export default User=mongoose.model("user",userSchema)
