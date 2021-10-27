const Mongoose=require('mongoose')

const StudentSchema=new Mongoose.Schema({
    StudentName: { type: String, required: true },
    StudentMobileNo: { type: String, required: true },
    StudentEmailId: { type: String, default: 'abcd@gmail.com' },
    StudentAddedDate: { type: Date, default: new Date() },
    role: { type: String, default: 'student' }
})

const Studentmodel=Mongoose.model("student",StudentSchema)

module.exports=Studentmodel