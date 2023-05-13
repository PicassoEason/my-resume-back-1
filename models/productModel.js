const mongoose=require('mongoose')
//定義欄位
const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter a product name"]
        },
        quantity:{
            type:Number,
            required:true,
            default: 0
        },price:{
            type:Number,
            required:true,
        }
        ,image:{
            type:String,
            required:false,
        }
    },
    {
        timestamps:true
    }
)
//定義資料表
const product=mongoose.model('Product',productSchema)

module.exports=product