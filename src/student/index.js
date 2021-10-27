const express=require('express')
const StudentController=require('./student.controller')
const AuthService = require('../auth.service')
let router=express.Router()

//router.post('/register',UserController.register)
router.post('/addstudent',AuthService.isloggedin, AuthService.isAdmin, StudentController.addStudent);
router.get('/gettodaystudent',AuthService.isloggedin, AuthService.isAdmin, StudentController.getStudent);




module.exports=router
