const express=require('express')
const UserController=require('./user.controller')
const AuthService=require('../auth.service')
let router=express.Router()

router.post('/register',UserController.register)

router.post('/login' ,UserController.login)
router.get('/verify',UserController.verify)
router.get('/getuserbymail',UserController.getuserbymail)

module.exports=router