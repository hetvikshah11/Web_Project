const mongoose=require('mongoose');
const db='mongodb+srv://student_management_system:student_system@cluster0.54jnvtt.mongodb.net/SMS?retryWrites=true&w=majority';

module.exports.createSchema=async()=>{
    await mongoose.connect(db,{
    }).then(()=>{
        console.log("connection successful");
    }).catch((err)=>{
        console.log("Failed",err);
    });
    const schema = new mongoose.Schema({
      First_name:{
        type:String,
        required:true
      },
      Last_name:{
        type:String,
        required:true
      },
      Birth_date:{
        type:String,
        required:true
      },
      Phone:{
        type:String,
        required:true
      },
      Email:{
        type:String,
        required:true
      },
      Password:{
        type:String,
        required:true
      }

    });
    Student = mongoose.model('student', schema);
}
module.exports.insert = async (First_name,Last_name,Birth_date,Phone,Email,Password) => {
   
    let data = new Student({
       First_name:First_name,
       Last_name:Last_name,
       Birth_date:Birth_date,
       Phone:Phone,
       Email:Email,
       Password:Password
    })
    let result = data.save();
    console.log(result);

}; 
module.exports.showDbs=async()=>{

    let data=await Student.find();
    let result=JSON.stringify(data);
    console.log(result);
    return result;

}