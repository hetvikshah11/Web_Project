const mongoose = require('mongoose');
const db = 'mongodb+srv://student_management_system:student_system@cluster0.54jnvtt.mongodb.net/SMS?retryWrites=true&w=majority';

module.exports.createSchema = async () => {
  await mongoose.connect(db, {
  }).then(() => {
    console.log("connection successful");
  }).catch((err) => {
    console.log("Failed", err);
  });
  const schema = new mongoose.Schema({
    First_name: {
      type: String,
      required: true
    },
    Last_name: {
      type: String,
      required: true
    },
    Birth_date: {
      type: String,
      required: true
    },
    Phone: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true
    },
    Password: {
      type: String,
      required: true
    },
    Total_Lecture: {
      type: Object
    },
    Lecture_Attended: {
      type: Object
    },
    Img_url: {
      type: String
    },
    Marks: {
      type: Object
    }

  });
  Student = mongoose.model('student', schema);
}
module.exports.insert = async (First_name, Last_name, Birth_date, Phone, Email, Password) => {

  let data = new Student({
    First_name: First_name,
    Last_name: Last_name,
    Birth_date: Birth_date,
    Phone: Phone,
    Email: Email,
    Password: Password
  })
  let result = data.save();
  console.log(result);

};
module.exports.showDbs = async () => {

  let data = await Student.find();
  let result = JSON.stringify(data);
  console.log(result);
  return result;

}

module.exports.getData = async (conditions) => {
  const rdata = await Student.find(conditions);
  // console.log(rdata)
  const returndata = JSON.stringify(rdata);
  return returndata;
}

module.exports.login = async (email, password) => {
  let data = await Student.findOne({ Email: email });
  if (data) {
    console.log(data["Password"]);
    if (data["Password"] === password) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
module.exports.isStudentUnique = async function (email) {
  let data = await Student.findOne({ email: email });
  // console.log(data["email"])
  if (data === null) {
    return true;
  }
  else {
    return false;
  }
}