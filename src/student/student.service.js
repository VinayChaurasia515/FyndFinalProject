const StudentModel=require('./student.model')

exports.addStudent=function(data){
    console.log('data   ::  ',data)
    return new Promise(function(resolve,reject){
        console.log('Student added into StudentsCollections')
        //actual logic for register
        var studentdata=new StudentModel(data)
        console.log(studentdata)
        studentdata.save().then((result)=>{
            console.log('user added into users collection ',result)
            if(result){
               resolve()
            }
            else{
                console.log('***********')
                reject()
            }
        },function(error){
            console.log('error in adding user to collection', error)
            if(error.code==11000)
            reject('Duplicate')
        })
    })
}

exports.getStudent=function(){
    
    return new Promise(function(resolve,reject){

        StudentModel.find().then((result)=>{
        //    console.log('user added into users collection ',result)
        console.log('list of all students')
            if(result){
               resolve(result)
            }
            else{
                console.log('***********')
                reject()
            }
        },function(error){
            console.log('error in adding user to collection', error)
            if(error.code==11000)
            reject('Duplicate')
        })
    })
}


