const mongoose = require("mongoose");
const db =
  "mongodb+srv://student_management_system:student_system@cluster0.54jnvtt.mongodb.net/SMS?retryWrites=true&w=majority";

module.exports.createSchema = async () => {
  await mongoose
    .connect(db, {})
    .then(() => {
      console.log("connection successful");
    })
    .catch((err) => {
      console.log("Failed", err);
    });
  const student_schema = new mongoose.Schema({
    First_name: {
      type: String,
      required: true,
    },
    Last_name: {
      type: String,
      required: true,
    },
    Birth_date: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Total_Lecture: {
      type: Object,
    },
    Lecture_Attended: {
      type: Object,
    },
    Img_url: {
      type: String,
    },
    Marks: {
      type: Object,
    },
  });
  Student = mongoose.model("student", student_schema);

  const teacher_schema = new mongoose.Schema({
    First_name: {
      type: String,
      required: true,
    },
    Last_name: {
      type: String,
      required: true,
    },
    Birth_date: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Total_Lecture: {
      type: Number,
    },
    Lecture_Conducted: {
      type: Number,
    },
    Img_url: {
      type: String,
    },
  });
  Teacher = mongoose.model("Teacher", teacher_schema);
};

module.exports.insertStudent = async (
  First_name,
  Last_name,
  Birth_date,
  Phone,
  Email,
  Password
) => {
  let data = new Student({
    First_name: First_name,
    Last_name: Last_name,
    Birth_date: Birth_date,
    Phone: Phone,
    Email: Email,
    Password: Password,
  });
  let result = await data.save();
  console.log(result);
};

module.exports.insertTeacher = async (
  First_name,
  Last_name,
  Birth_date,
  Phone,
  Email,
  Password
) => {
  let data = new Teacher({
    First_name: First_name,
    Last_name: Last_name,
    Birth_date: Birth_date,
    Phone: Phone,
    Email: Email,
    Password: Password,
  });
  let result = await data.save();
  console.log(result);
};

module.exports.showDbs = async () => {
  let data = await Student.find();
  let result = JSON.stringify(data);
  console.log(result);
  return result;
};

module.exports.getStudentData = async (conditions) => {
  const sdata = await Student.findOne(conditions);
  const studentdata = JSON.stringify(sdata);
  return studentdata;
};

module.exports.getTeacherData = async (conditions) => {
  const tdata = await Teacher.findOne(conditions);
  const teacherdata = JSON.stringify(tdata);
  return teacherdata;
};

module.exports.studentAvailable = async (email, password) => {
  let data = await Student.findOne({ Email: email });
  if (data) {
    console.log(data["Password"]);
    if (data["Password"] === password) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports.teacherAvailable = async (email, password) => {
  let data = await Teacher.findOne({ Email: email });
  if (data) {
    console.log(data["Password"]);
    if (data["Password"] === password) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports.isStudentUnique = async function (email) {
  let data = await Student.findOne({ Email: email });
  if (data === null) {
    return true;
  } else {
    return false;
  }
};

module.exports.isTeacherUnique = async function (email) {
  let data = await Teacher.findOne({ Email: email });
  if (data === null) {
    return true;
  } else {
    return false;
  }
};
