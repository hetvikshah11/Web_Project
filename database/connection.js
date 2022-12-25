const mongoose = require('mongoose');
const db = 'mongodb+srv://student_management_system:student_system@cluster0.54jnvtt.mongodb.net/SMS?retryWrites=true&w=majority';

module.exports.createSchema = async () => {
  await mongoose.connect(db, {
  }).then(() => {
    console.log("connection successful");
  }).catch((err) => {
    console.log("Failed", err);
  });
  const lectures = new mongoose.Schema({
    Subject_name: String,
    attended: Number
  })
  const lecture_info = new mongoose.Schema({
    Subject_name: String,
    No_of_lec: Number
  })
  const Grades = new mongoose.Schema({
    Subject_name: String,
    Marks: Number,
    Date: String
  })

  const material_schema = new mongoose.Schema({
    Subject_name: String,
    File_name: String,
    URL: String
  })
  Material = mongoose.model('material', material_schema);
  const assignment_schema = new mongoose.Schema({
    Subject_name: String,
    File_name: String,
    URL: String
  })
  Assignment = mongoose.model('assignment', assignment_schema);
  const student_schema = new mongoose.Schema({
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
    Year: {
      type: String
    },
    Total_Lecture: [lecture_info],
    Lecture_Attended: [lectures],
    Img_url: {
      type: String
    },
    Marks: [Grades]

  });
  Student = mongoose.model('student', student_schema);

  const teacher_schema = new mongoose.Schema({
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
    Subject_name: {
      type: String
    },
    Lecture_count: {
      type: Number
    },
    Lecture_Conducted: {
      type: Number,
      default: 0
    },
    Img_url: {
      type: String
    },
  });
  Teacher = mongoose.model('Teacher', teacher_schema);

}

module.exports.insertStudent = async (First_name, Last_name, Birth_date, Phone, Email, Password, Year) => {
  let tdata=await Teacher.find({});
  
  let data = new Student({
    First_name: First_name,
    Last_name: Last_name,
    Birth_date: Birth_date,
    Phone: Phone,
    Email: Email,
    Password: Password,
    Year: Year
  })
  let result = await data.save();
  for(i in tdata)
  {
    let data1 = await Student.updateOne({Email: Email}, { $push: { "Lecture_Attended": { Subject_name: tdata[i].Subject_name, attended: 0 } } });
    let data2 = await Student.updateOne({Email: Email}, { $push: { "Total_Lecture": { Subject_name:tdata[i].Subject_name, No_of_lec: tdata[i].Lecture_count } } })
    console.log(result);
  }

};

module.exports.insertTeacher = async (First_name, Last_name, Birth_date, Phone, Email, Password, Subject, Lectures) => {
  let data = new Teacher({
    First_name: First_name,
    Last_name: Last_name,
    Birth_date: Birth_date,
    Phone: Phone,
    Email: Email,
    Password: Password,
    Subject_name: Subject,
    Lecture_count: Lectures
  })
  let result = await data.save()
  console.log(result)
}

module.exports.showDbs = async () => {
  let data = await Student.find();
  let result = JSON.stringify(data);
  console.log(result);
  return result;
}

module.exports.getStudentData = async (conditions) => {
  const sdata = await Student.findOne(conditions);
  const studentdata = JSON.stringify(sdata);
  return studentdata;
}

module.exports.getTeacherData = async (conditions) => {
  const tdata = await Teacher.findOne(conditions);
  const teacherdata = JSON.stringify(tdata);
  return teacherdata;
}

module.exports.studentAvailable = async (email, password) => {
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

module.exports.teacherAvailable = async (email, password) => {
  let data = await Teacher.findOne({ Email: email });
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
  let data = await Student.findOne({ "Email": email });
  if (data === null) {
    return true;
  }
  else {
    return false;
  }
}

module.exports.isTeacherUnique = async function (email) {
  let data = await Teacher.findOne({ "Email": email });
  if (data === null) {
    return true;
  }
  else {
    return false;
  }
}

module.exports.StudentId = async (email) => {

  let data = await Student.findOne({ Email: email });
  let result = JSON.stringify(data);
  // console.log(result);
  return result;
}
module.exports.TeacherId = async (email) => {

  let data = await Teacher.findOne({ Email: email });
  let result = JSON.stringify(data);
  // console.log(result);
  return result;
}

module.exports.getData = async (id) => {
  let data = await Student.findOne({ _id: id });
  if (data == null) {
    data = await Teacher.findOne({ _id: id });
  }
  let result = JSON.stringify(data);
  return result;
}

module.exports.updateStudentProfPic = async (id, filepath) => {
  let data = await Student.updateOne({ _id: id }, { $set: { Img_url: filepath } });
  // let data=await Student.findByIdAndUpadte(id,{Img_url:filepath});
  if (data) {
    console.log('Success');

  }
  else {
    console.log("Failure");
  }
}
module.exports.updateTeacherProfPic = async (id, filepath) => {
  let data = await Teacher.updateOne({ _id: id }, { $set: { Img_url: filepath } });
  // let data=await Student.findByIdAndUpadte(id,{Img_url:filepath});
  if (data) {
    console.log('Success');

  }
  else {
    console.log("Failure");
  }
}

module.exports.addSubject = async (Subject, count) => {
  console.log(count);
  let data1 = await Student.updateMany({}, { $push: { "Lecture_Attended": { Subject_name: Subject, attended: 0 } } });
  let data2 = await Student.updateMany({}, { $push: { "Total_Lecture": { Subject_name: Subject, No_of_lec: count } } })

}
module.exports.getSubjectName = async (id) => {
  let data = await Teacher.findOne({ _id: id });
  let subject = data.Subject_name;
  return subject;

}
module.exports.addGrades = async (subject, marks, id) => {
  var date=new Date();
  date=date.toLocaleDateString();
  for (i in marks) {
    var data = await Student.updateOne({ _id: id[i] }, {
      $push: {
        "Marks": {
          Subject_name: subject, Marks: marks[i], Date: date
        }
      }
    })
  }
}

module.exports.markAttendance = async (subject, id) => {
  console.log(id)
  let data = await Student.findOne({ _id: id })
  let result = data.Lecture_Attended
  // console.log(data.Lecture_Attended)
  for (d in result) {
    if (result[d].Subject_name === subject) {
      let att = result[d].attended + 1
      let res = await Student.updateOne({ _id: id, 'Lecture_Attended.Subject_name': subject }, {
        $set: {
          'Lecture_Attended.$.attended': att
        }
      });
      console.log(res);
    }
  }
}

module.exports.insertMaterial = async (subject, link, name) => {

  let material = new Material({
    Subject_name: subject,
    File_name: name,
    URL: link
  })
  let result = await material.save();
  console.log(result);

};
module.exports.uploadAssignment = async (subject, link, name) => {

  let assignment = new Assignment({
    Subject_name: subject,
    File_name: name,
    URL: link
  })
  let result = await assignment.save();
  console.log(result);

};


module.exports.getAllMaterial = async () => {
  let result = await Material.find({});
  return JSON.stringify(result);
}
module.exports.getAllAssignment = async () => {
  let result = await Assignment.find({});
  return JSON.stringify(result);
}
module.exports.addLectureConducted = async (id) => {
  let result = await Teacher.findOne({ _id: id })
  let conducted = result.Lecture_Conducted + 1
  await Teacher.updateOne({ _id: id }, {
    $set: {
      'Lecture_Conducted': conducted
    }
  });
  let subjectname = result.Subject_name;
  let res = await Student.updateMany({ 'Total_Lecture.Subject_name': subjectname }, { $set: { 'Total_Lecture.$.No_of_lec': conducted } })
}


module.exports.getAllStudentData = async () => {
  const sdata = await Student.find();
  const studentdata = JSON.stringify(sdata);
  return studentdata;
}

module.exports.updatePass = async (Email, NPass) => {
  const data = await Student.findOne({ Email: Email })
  if (!data) {
    await Teacher.updateOne({ Email: Email }, { $set: { Password: NPass } })
  }
  else {
    await Student.updateOne({ Email: Email }, { $set: {Password: NPass } })
  }
}