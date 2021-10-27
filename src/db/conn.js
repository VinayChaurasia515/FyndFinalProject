const Mongoose = require('mongoose');
//const dburl = 'mongodb://localhost:27017/attendanceSystem'

const dburl='mongodb+srv://vinaychaurasiarock999:Vinay@515@cluster0.t7iqi.mongodb.net/attendanceSystem?retryWrites=true&w=majority'

Mongoose.connect(dburl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log('Connection Successfull :: ')
}).catch((error) => {
    console.log('Error in connection')
})