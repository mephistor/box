const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const app=express();
const expressArt=require('express-art-template');
mongoose.connect('mongodb://localhost:27017/studentsdb',{useMongoClient:true});
app.engine('art',expressArt);
app.use(express.static('www'));
app.use(bodyParser.urlencoded({extended:true}));
const db=mongoose.connection;
db.on('open',()=>{
    console.log('数据库打开了');
})
const schema=mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    age:Number
})
const User=mongoose.model('students',schema);
app.post('/add',(req,res)=>{
const user=new User(req.body);
user.save((error)=>{
    res.json({code:1});
})
})
app.get('/all',(req,res)=>{
    User.find((error,data)=>{
        res.render('index.art',{users:data});
    })
})
app.get('/remove',(req,res)=>{
    User.findByIdAndRemove(req.body.id,(error)=>{
        res.json({code:1});
    })
})
app.listen(3001,()=>{
    console.log('服务器运行中，滴滴滴...');
})