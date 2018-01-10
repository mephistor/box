
const express = require('express');
const bodyParser = require('body-parser');
const expressArt=require('express-art-template');
const fs = require('fs');
const app = express();
app.engine('art',expressArt);
app.use(express.static('www'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/login', (req, res) => {
    const name = req.query.username;
    const password = req.query.password;
   
    fs.readFile('users.json', (err, data) => {
        const dataArray = JSON.parse(data);
        const hah = dataArray[1].username
        const anw = dataArray[1].password;
        for (let i = 0; i < dataArray.length; i++) {
            if (name == dataArray[i].username) {
                if (password == dataArray[i].password) { 
                   res.json({code:1,message:'登录成功！'})
                    return;
                }
                res.json({
                    code: 0,
                    message: '密码错误！'
                });
                return;
            }
        }
        res.json({
            code: 0,
            message: '用户名不存在！'
        });
        return;
    })
})
app.post('/signup', (req, res) => {
  
    const dataobj = req.body;
    fs.readFile('users.json', (err, data) => {
        const dataArray = JSON.parse(data);
        const wo = dataArray[0];
        const a = dataobj.username;
        for (let q = 0; q < dataArray.length; q++) {
            if (dataobj.username == dataArray[q].username) {
                res.json({
                    code: 0,
                    message: '用户名已存在！'
                });
                return;
            }
        }
        dataArray.push(dataobj);
        fs.writeFile('users.json', JSON.stringify(dataArray), err => {
            res.json({
                code: 1,
                message: '注册成功！'
            });
        })
    })
})

app.get('/all',(req,res)=>{
    res.setHeader('content-type','application/json');
    console.log('请求发送出去了');
   const r=fs.createReadStream('users.json');
   r.pipe(res);
})
app.listen(3002, () => {
    console.log('来啊，快活啊');
});
app.get('/show',(req,res)=>{
    fs.readFile('users.json',(err,data)=>{
     const   dataArray=JSON.parse(data);
        const dataObj={users:dataArray};
        console.log(dataObj);
        res.render('users.art',dataObj);

    })
  
})