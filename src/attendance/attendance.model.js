const Mongoose = require('mongoose')

const AttendanceSchema = new Mongoose.Schema({
    Date: { type: Date, default: new Date() },
    RollNumber: { type: String, require: true },
    StudentName: { type: String, required: true },
    StudentMobileNo: { type: String, required: true },
    StudentEmailId: { type: String, required: true },
    Status: { type: String, default:'absent' }
})

const Attdencemodel = Mongoose.model("attendance", AttendanceSchema)

module.exports = Attdencemodel