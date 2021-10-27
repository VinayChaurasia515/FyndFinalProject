const Userservice = require('./user.service')
const AuthService = require('../auth.service')
const Mailservice = require('../mail.service')
const AttendanceService=require('../attendance/attendance.service')
//const PasswordEncript=require('./bcrypt.service')
//const fs=require('fs')
const UserModel = require('./user.model')

exports.register = function (req, res) {
    console.log('++++++++++++++++')
    console.log('data received  :: ', req.body)
    // console.log('data received  :: ', req.body.email)
    // console.log('data received  :: ', req.body.password)

    Userservice.addUser(req.body).then(() => {
        AuthService.createToken({ email: req.body.email }, function (error, token) {
            if (error) {
                //remove the user from database and send internal server error
                Userservice.deleteUser()
                res.status(500).send()
                //   res.send("user already exist")
            }
            else {
                console.log('data received to controller')
                //create the url
                console.log("Email             ::: ", req.body.email)
                console.log("req.protocol      ::: ", req.protocol)  // http
                console.log("req.hostname      ::: ", req.hostname)  //localhost
                console.log("req.originalUrl   ::: ", req.originalUrl)// /user/register
                console.log("token             ::: ", token)       // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmE1czFzZWRzMGRycmZkQGdtYWlsLmNvbSIsImlhdCI6MTYzMTQ1NDY2OCwiZXhwIjoxNjMxNDU4MjY4fQ.iruUj4xXAA9jYjpA2_Os8y5nYe85jDsTPWNY5Htwf2c


                var url = req.protocol + "://" + req.hostname + "/user/verify?token=" + token

                var hardcodedurl = "http://localhost:3000/user/verify?token=" + token
                console.log('url   :::  ', hardcodedurl)  // http://localhost:3000/user/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmF5Y2hhdXJhc2lhcm9jazk5OUBnbWFpbC5jb20iLCJpYXQiOjE2MzE0NTYzOTEsImV4cCI6MTYzMTQ1OTk5MX0.xSRJ9yUhaKXNaxaOWoTZmg2yx1VCZffbGUFKPrg1EY4

                Mailservice.sendVerificationMail(req.body.email, hardcodedurl).then(function (result) {
                    
                    res.send({
                        message: ">>>>>> Please check your mail>>>>>>"
                    })
                }).catch(function () {
                    Userservice.deleteUser()
                    res.status(500).send('qqqqqqqqqqq')
                })
                console.log("mail sended")
            }

        })

        // PasswordEncript.encriptPassword(password:req.body.pass).then(function(error,encriptpassord){

        // })
    }, function (error) {
        if (error == 'Duplicate') {
            //  res.send("user already exist") 
            // res.status(500).send({
            //     error: " Already User Exists"
            // })
            res.status(500).redirect('/duplicate')

        }
        else {
            res.status(500).send()
            console.log("ABCDEF", error)
        }
    })
}

exports.login = function (req, res, next) {

    console.log('data received for login :: ', req.body)
    Userservice.findUser(req.body).then((result) => {
        //  console.log('****************************************')
        if (result) {
            var payload = {
                email: result.email,
                role: result.role
            }
           
            AuthService.createToken(payload, function (error, token) {
                // AuthService.findUser({email:req.body.email})
                res.set("authtoken", token)

                res.cookie('authtoken',token,{
                    expires:new Date(Date.now()+25892000000),
                    secure: false, // set to true if your using https
                    httpOnly: true
                })
                console.log('cookie stored')
                // res.send({
                //     message: "login done"
                // })
                console.log('logIn Done')
                console.log('Checking User admin or not')
                const role = { role: 'admin', email: req.body.email }
                UserModel.find(role).then((result) => {
                    if (result.length == 1) {
                        console.log('LogIn done, User is  admin')
                        console.log('Admin data  :::  ', result)
                        res.redirect('/adminwork')
                    } else {
                        console.log('LogIn done, User is Student')

                        AttendanceService.getStudentStatus().then((result)=>{
                            console.log('see student Attendance status',result)
                            res.render('studentwork',{
                                r:result
                            })
                        })                        
                        // res.render('studentwork',{
                        //     r:result
                        // })
                    }
                }, (error) => {
                    console.log('Error: Not Getting Student Information', result)
                })
            })
        }
        else {
            res.send({
                message: "Invalid Credencials"
            })
        }
    }, (error) => {
        //console.log("ABCDEF", error)
        res.status(500).send({
            error: "Internal Servers Error"
        })
    })
}

exports.verify = function (req, res) {
    var token = req.query.token
    //retrive email from token
    console.log('22222222222    ::::    ',token)
    AuthService.verifyToken(token, function (error, result) {
        if (error) {
            res.status(500).send()
        }
        else {
            console.log('=====111:::   ',result)
            console.log('=====111:::   ',result.email)
            Userservice.verifyUser(result.email).then(function () {
                res.send({
                    message: "user verified"
                })
            }), function () {
                res.status(500).send()
            }
        }
    })


    Userservice.verifyUser(token)
}

exports.getuserbymail = function (req, res) {
    console.log('query url :: ', req.query)
    UserService.getuserbymail(req.query).then(function (data) {
        res.send({ data }).catch(
            res.send({
                "message": "Error occured in creating cover"
            })
        )
    })
}