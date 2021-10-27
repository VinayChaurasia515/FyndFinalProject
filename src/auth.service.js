const Jwt=require('jsonwebtoken')

exports.createToken=function(payload,callback){
    console.log('data token :: ')
    Jwt.sign(payload,"mysecretkey",{expiresIn:'1h'},function(error,token){
        if(error){
            console.log('data token :: ')
            callback(error,null)
        }
        else{
           // console.log('data toke ',error)
            console.log('dataaaaaaaaaaa ')
            callback(null,token)
        }
    })
}

exports.verifyToken=function(token,callback){
    console.log("here we will verify token from mail")
    Jwt.verify(token,"mysecretkey",function(error,payload){
        if(error){
            callback(error,null)
        }
        else{
            callback(null,payload)
            console.log('PAYLOAD   :::    ',payload)
        }
    })
}

exports.isloggedin=function(req,res,next){
    //var token=req.get("authtoken") //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmF5Y2hhdXJhc2lhcm9jazk5OUBnbWFpbC5jb20iLCJpYXQiOjE2MzE3MDQxMDcsImV4cCI6MTYzMTcwNzcwN30.TjZBbtB5IeBs9J2l5iRjGOG8ViqWGmfUE70dYeDzc4k&source=gmail&ust=1631795800172000&usg=AFQjCNE_C7sy4a-wntgGkA7fDMcwvny6yw
      var token=req.cookies.authtoken
     console.log('===========',token)
    Jwt.verify(token,"mysecretkey",function(error,payload){
        if(error){
            res.status(401).send({
                error:"UnAuthorized"
            })
        }
        else{
            next()
        }
    })
}

exports.isAdmin=(req,res,next)=>{
    console.log('checking admin or not.....')
 //   var token=req.get("authtoken")
    console.log('checking admin or not.....')
    var  token=req.cookies.authtoken
    Jwt.verify(token,"mysecretkey",(error,payload)=>{
        if(error){
            res.status(401).send({
                error:"UnAuthorized token"
            })
            console.log("error in verify token")
        }
        else{
            if(payload.role=="admin"){
             next()
            }
             else{
                res.status(401).send({
                    error: "UnAuthorized admin"
             })
             console.log("error in admin ")
        }
    }
    })
}