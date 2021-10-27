const AttendanceService = require('./attendance.service')
const AuthServiceStudent = require('../auth.service.student')

const Attdencemodel = require('./attendance.model')

exports.takeattendance = (req, res) => {

    // console.log('Attendance data  ', req.body)
    // console.log('Attendance data  ', req.body.StudentEmailId + 'zzzz')
    // console.log('Attendance data  ', req.body.StudentEmailId.trim() + 'zzzz')
    // var StudentEmailId=res.body.StudentEmailId.trim();
    // var StudentName=res.body.StudentName.trim();
    // var StudentMobileNo=res.body.StudentMobileNo.trim();
    var data = {
        'StudentName': req.body.StudentName.trim(),
        'StudentEmailId': req.body.StudentEmailId.trim(),
        'StudentMobileNo': req.body.StudentMobileNo.trim()
    }
    console.log('Attendance data  ', data)
    AttendanceService.takeattendance(data).then((result) => {
  //  AttendanceService.takeattendance(req.body).then((result) => {

        console.log('result   ::===:   ', result)
    //    console.log('result  length ::===:   ', result.length)
        console.log(typeof (result))
        // objectLength = Object.keys(result).length+1
        // console.log(objectLength)
        // console.log(Object.entries(result));

        if (result.length === 0) {
            console.log('This student data not found OR add this Student')
            res.send({
                "Message": "This student data not found OR add this Student"
            })
        }
        // console.log('=====++++++', req.body.StudentEmailId)  //vinaychaurasiarock999@gmail.com
        
      //  Attdencemodel.find({result}).then(())
        
        
        // var payload = {
        //     email: result.email
        // }
        // console.log('$$$$$$$$$$$',payload)
        // AuthServiceStudent.createToken(payload, function (error, token) {
        //     if (error) {
        //         AttendanceService.deleteStudent()
        //         res.status(500).send()
        //     }
        //     else {
        //         var hardcodedurl = "http://localhost:3000/attendance/verify?token=" + token
        //         console.log('url   :::  ', hardcodedurl)

        //         MailserviceStudent.sendVerificationMail(req.body.StudentEmailId, hardcodedurl).then((result) => {
        //             console.log("mail sended")
        //             res.send({
        //                 message: ">>>>>>> Attendence  Pool send to student >>>>>>>>"
        //             })
        //         }).catch(function () {
        //             AttendanceService.deleteStudent()
        //             res.status(500).send('qqqqqqqqqqq')
        //         })
        //     }
        // })
        // res.send({
        //     "Messageaa": result
        // })
        res.send({
            message: ">>>>>>> Attendence  Pool send to student >>>>>>>>"
        })
    }).catch((error) => {
        res.send({
            'Message': error
        })
    })
}

exports.verify = function (req, res) {
    var token = req.query.token
    //retrive email from token
    console.log('22222222222    ::::    ', token)
    AuthServiceStudent.verifyToken(token, (error, result) => {
        if (error) {
            res.status(500).send()
        }
        else {
            console.log('=====111:::   ', result)
            console.log('=====111:::   ', result.email)
            AttendanceService.verifyStudent(result.email).then((result) => {
                res.send({
                    Result: result,
                    message: "Student Submit their Attendence"
                })
            }), function () {
                res.status(500).send()
            }
        }
    })
    AttendanceService.verifyStudent(token)
}

exports.getStudentStatus = (req, res) => {
    AttendanceService.getStudentStatus().then((result) => {
        console.log('see student Attendance status', result)
        //    res.status(201).send(result)
        res.render('studentwork', {
            r: result
        })
    }).catch(function (err) {
        console.log('error', err)
        res.status(500).redirect('/servererror ')
    })
}

exports.getReport=(req,res)=>{
    AttendanceService.getReport().then((result) => {
        res.send('done');
    }).catch(function (err) {
        console.log('error', err)
        res.status(500).send(err);
    })
}