//require ('dotenv').config();
const express = require ("express");
//const bodyParser = require ("body-parser");
const ejs = require ("ejs");
const mongoose = require ("mongoose");
const bcrypt = require ("bcrypt");
const conn=require('./db/conn')
const routes=require('./routes')
//const user=require('./regi.model')
const AuthService=require('./auth.service')

const cors = require('cors');
const cookieParser = require('cookie-parser');


const saltRounds = 10;
const PORT=process.env.PORT||3000
const app = express();
app.use( express.urlencoded( { extended: false } ) );

app.use(cookieParser());

// Set up JSON data sent using Ajax request on req.body
app.use( express.json() );
//app.use(bodyParser.json())

app.use(routes)


app.use(express.static("public"));
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.get("/", function(req,res){
    console.log("get home page")
    res.render("home");
});
app.get("/login", function(req,res){
    console.log("get login page")    
    res.render("login");
});
app.get("/register", function(req,res){
    console.log("get register page")
    res.render("register");
});
app.get("/duplicate", (req,res)=>{
    console.log("get duplicate page")
    res.render("duplicate");
});
app.get("/success", (req,res)=>{
    console.log("get success page")
    res.render("success");
});
app.get("/adminwork",AuthService.isAdmin, function(req,res){
    console.log("admin work")
    res.render("adminwork");
});
app.get("/studentwork", function(req,res){
    console.log("student work")
    res.render("studentwork");
});

app.get('/addstudent',(req,res)=>{
    console.log('add Student by admin')
})

// app.get('/getstudent',(req,res)=>{
//     console.log('get student')
//     res.render("takeattendance",{  result
//     });
// })
app.get('/takeattendance',(req,res)=>{
    console.log('take attendance')
    res.render("takeattendance",{  result:'vinay'
    });
})

// app.post("/registersefe", function (req, res) {
//     console.log('aaaaaaaaaaaaa')
//     console.log(req.body)
//     console.log(req.body.email)
//     console.log(req.body.password)

//     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//         const newUser = new user({
//             email: req.body.username,
//             password: hash
//         });
//         var query={
//             'email':'req.body.email'
//         } 
//         console.log('............................drfgreg....')
//         console.log(newUser.email)
//    //     console.log(newUser)

//         user.find({query}).then((result)=>{
//             console.log(result.length)
//             if(result.length==0){               
//                 newUser.save(req.body).then((result)=>{
//                  //   console.log('data saved',result);
//                  res.render('success')
//                 })                
//             }
//             else{
//                 console.log('--------------',result)
//                 res.render('duplicate');               
//             }          
//         }).catch((error)=>{
//             console.log('==================================================================',error)
//             res.render('duplicate')
//         })     
//     });
// });

// app.post("/loginaa",(req, res)=>{
//     const username = req.body.username;
//     const password = req.body.password;

//     User.findOne({email: username}, (err,foundUser)=>{
//         if (err) {
//             console.log(err);
//         } else {
//             if (foundUser) {
//                 bcrypt.compare(password, foundUser.password, function(err, result)  {
//                     if (result === true) {
//                         res.render("secrets");
//                     }
//                 });
//             }
//         }
//     });
// });


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
});



