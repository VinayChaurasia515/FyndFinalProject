const express=require('express')

let router=express.Router()

let userroutes=require('./user')
router.use('/user',userroutes)

let studentroutes=require('./student')
router.use('/student',studentroutes)

let attendanceroutes=require('./attendance')
router.use('/attendance',attendanceroutes)

module.exports=router