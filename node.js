const express=require('express');
const app=express();


const path = require('path');
const connection=require('./database/connection');
app.use(express.json())
app.use(express.urlencoded({extended:true}));
connection.createSchema();


app.use(express.static("./"));
app.set('view engine','ejs');
app.get('index.html/',(req,res)=>{
       
        res.sendFile("D:/Web_Project/Web_Project/index.html")
})

app.post('/',async(req,res)=>{
    const First_name=req.body.fname;
    const Last_name=req.body.lname;
    const Birth_date=req.body.birthdate+'';
    const Phone=req.body.phone;
    const email=req.body.register_email;
    const password=req.body.register_password;
   await connection.insert(First_name,Last_name,Birth_date,Phone,email,password);
    // res.sendFile(path.join(__dirname+'/dashboard_s.html'))
    res.render('dashboard_s',{First_name});
})













app.listen(3000,()=>{
    console.log('Listening at Port 3000');
})