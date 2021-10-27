const express=require('express')
const AuthService=require('../auth.service')
const AttendanceController=require('./attendance.controller')

let router=express.Router()

router.post('/takeattendance',AuthService.isloggedin, AuthService.isAdmin, AttendanceController.takeattendance)
router.get('/verify',AttendanceController.verify)
router.get('/getstudentstatus',AuthService.isloggedin,AttendanceController.getStudentStatus)
router.get('/downloadreport',AuthService.isloggedin,AttendanceController.getReport);
// router.post('/aaa',()=>{
//     console.log('AAAAAAAAAAAAAAA')
// })
module.exports=router