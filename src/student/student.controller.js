//const multer = require('multer')
const StudentService = require('./student.service')


exports.addStudent = function (req, res) {
    console.log('Student Data   :::   ', req.body)

    StudentService.addStudent(req.body).then((result) => {
        res.send({
            "Message": "Student added",
            "Product": result
        })
        //    res.status(200).redirect('/studentadded ')
    }).catch(function (err) {
        console.log('error', err)
        // res.send({
        //     "Messages===": err
        // })
        //   res.status(500).redirect('/servererror ')
    })
}

exports.getStudent = function (req, res) {
    StudentService.getStudent().then((result) => {
        
        res.render('takeattendance', {
            r:result
        })
        // res.render('studentwork',{
        //     r:result
        // })

        //res.send(result[0].StudentName)
        //    res.status(200).redirect('/studentadded ')
    }).catch(function (err) {
        console.log('error', err)
        // res.send({
        //     "Messages===": err
        // })
        //   res.status(500).redirect('/servererror ')
    })
}

