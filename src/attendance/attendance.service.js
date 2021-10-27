const AttendanceModel = require('./attendance.model')
const StudentModel = require('../student/student.model')
const ExcelJs = require('exceljs')
const Attdencemodel = require('./attendance.model')
const AuthServiceStudent = require('../auth.service.student')
const MailserviceStudent = require('../mail.service.studentAttendence')

exports.takeattendance = (data) => {
    return new Promise((resolve, reject) => {
        console.log('In service.....')
        console.log('data    :::   ', data)
        StudentModel.find(data).then((result) => {
            console.log('result   :::   ', result)
            console.log('result length  :::   ', result.length)

            // if (result.length === 0) {
            //     resolve(result)
            // }

            // else 
            if (result.length === 1) {
                var attdencedata = new AttendanceModel(data)
                console.log('This student data found')
                console.log('This student data store in Attdence Collections')
                attdencedata.save().then((result1) => {
                    if (result1) {
                        Attdencemodel.find(result1).then((result2) => {
                            console.log('result2   :::   ', result2)
                            console.log('result2 length  :::   ', result2.length)
                            var payload = {
                                email: result2[0].StudentEmailId
                            }
                            console.log('$$$$$$$$$$$', payload)
                            AuthServiceStudent.createToken(payload, function (error, token) {
                                if (error) {
                                    AttendanceService.deleteStudent()
                                    res.status(500).send()
                                }
                                else {
                                    var hardcodedurl = "http://localhost:3000/attendance/verify?token=" + token
                                    console.log('url   :::  ', hardcodedurl)
                                    var email=payload.email
                                    //'vinaychaurasiarock999@gmail.com'
                                    //req.body.StudentEmailId
                                    MailserviceStudent.sendVerificationMail(email, hardcodedurl).then((result) => {
                                        console.log("mail sended")
                                        resolve('mail sended to student')
                                        
                                    }).catch(function () {
                                        AttendanceService.deleteStudent()
                                        res.status(500).send('qqqqqqqqqqq')
                                    })
                                }
                            })
                        })
                        
                    }
                    else {
                        reject()
                    }
                }, function (error) {
                    console.log('error in adding user to collection', error)
                    if (error.code == 11000)
                        reject('Duplicate')
                })
            }
            else {
                reject('Something went wrong')
            }
        })
    })
}

exports.verifyToken = function (token, callback) {
    console.log("here we will verify token from mail")
    Jwt.verify(token, "mysecretkey", function (error, payload) {
        if (error) {
            callback(error, null)
        }
        else {
            callback(null, payload)
        }
    })
}

exports.deleteStudent = function (data) {
    return new Promise(function (resolve, reject) {
        var query = {
            email: data.email
        }
        AttdenceModel.remove(query).then(function (result) {
            console.log("rusult of removing user from db ", result)
            resolve()
        }, function (error) {
            console.log("Error of removing user from db ", result)
            //error()
            reject()
        })
    })
}
exports.verifyStudent = function (email) {
    //verify the token first from  the payload of the toke we will extract email of
    //the user to which token was sign
    console.log('Email  ===>>><<<<', email)
    return new Promise(function (resolve, reject) {
        var findQuery = {
            StudentEmailId: email
        }
        var updateQuery = {
            $set: {
                Status: 'present'
            }
        }
       
        AttendanceModel.findOneAndUpdate(findQuery, updateQuery).then(function (result) {
            console.log("result of verifying user in db is ", result)
            resolve()
        }, function (error) {
            console.log("error of verifying user in db is ", error)
            reject()
        })
    })
}

exports.getStudentStatus = (data) => {
    return new Promise(function (resolve, reject) {

        AttendanceModel.find().then((result) => {
            console.log('list of all students attendance status :::  ', result)
            if (result) {
                resolve(result)
            }
            else {
                console.log('***********')
                reject()
            }
        }, function (error) {
            console.log('error in adding user to collection', error)
            if (error.code == 11000)
                reject('Duplicate')
        })
    })

}

exports.getReport = () => {
    return new Promise(function (resolve, reject) {

        // app.get('/sheet', async (req, res, next) => {
        //     const startDate = moment(new Date()).startOf('month').toDate();
        //     const endDate = moment(new Date()).endOf('month').toDate();
        try {
            // const users = await User.find({created_at:{$gte: startDate, $lte: endDate}});
            const workbook = new ExcelJs.Workbook();
            const worksheet = workbook.addWorksheet('My Users');
            worksheet.columns = [
                { header: '#', key: 's_no', width: 10 },
                { header: 'Date', key: 'date', width: 10 },
                { header: 'Roll Number', key: 'rollnumber', width: 10 },
                { header: 'Name', key: 'name', width: 10 },
                { header: 'Mobile Number', key: 'mobilenumber', width: 10 },
                { header: 'Email ID', key: 'emialid', width: 10 },
                { header: 'Status', key: 'status', width: 10 },
            ];
            //   let count = 1;
            AttdenceModel.forEach(user => {
                //       (user as any).s_no = count;
                worksheet.addRow(user);
                //      count += 1;
            });
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            });
            //  const data = await workbook.xlsx.writeFile('studentReport.xlsx')
            const data = workbook.xlsx.writeFile('studentReport.xlsx')
            resolve()

        } catch (e) {
            reject(e)

        }
        //   });



    })
}