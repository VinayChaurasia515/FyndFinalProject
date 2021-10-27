const Mongoose=require('mongoose')

const UserSchema=new Mongoose.Schema({
    email:{type:String, unique:true,required:true},
    password:{type:String,required:true},
    verified:{type:Boolean,default:false},
    createddate:{type:Date,default:new Date()},
    role:{type:String,default:'user'}
})

const Usermodel=Mongoose.model("users",UserSchema)

module.exports=Usermodel