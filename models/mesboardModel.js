const mongoose=require('mongoose')
//定義欄位
const mesboardSchema=mongoose.Schema(
    {
        Username:{
            type:String,
            required:true,
            default: "路人"
        },
        body:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)
//定義資料表
const message=mongoose.model('message',mesboardSchema)

module.exports=message