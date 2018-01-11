const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer();
server.on('request', (req, res) => {
    const regex = /(.css|.js|.html|\/$)|(fonts+)/;
    if (regex.test(req.url)) {
        const r = fs.createReadStream('www' + (req.url == '/' ? '/home.html' : req.url));
        r.pipe(res);
    }
    if (req.url == '/add') {
        res.setHeader('content-type', 'application/json');
        let total = '';
        req.on('data', data => {
            total += data;
        })
        req.on('end', () => {

            const object = querystring.parse(total);
            console.log(object);
            fs.readFile('user.json', (err, data) => {
                const name = object.name;
                const dataArray = JSON.parse(data);

                console.log(dataArray);
                console.log(name);
                for (let i = 0; i < dataArray.length; i++) {
                    if (name == dataArray[i].name) {
                        return res.end(JSON.stringify({
                            success: 0,
                            message: 'gg'
                        }));
                    }
                }
                dataArray.push(object);
                fs.writeFile('user.json', JSON.stringify(dataArray), err => {
                    if (err) {
                        return res.end(JSON.stringify({
                            success: 0,
                            message: '出问题了'
                        }))
                    };
                    res.end(JSON.stringify({
                        succsee: 1,
                        message: 'congratulations!'
                    }));
                    return;
                })
            })
        })
    }
    if (req.url == '/home') {
        res.setHeader('content-type', 'application/json');
        fs.readFile('user.json', (err, data) => {
            const dataArr = JSON.parse(data);
            res.end(JSON.stringify(dataArr));
        })
    }
    if (req.url == '/delete') {
        res.setHeader('content-type', 'application/json');
        let all = '';
        req.on('data', data => {
            all += data;
        })
        req.on('end', () => {
            const value = querystring.parse(all);
            const name = value.name;
            fs.readFile('user.json', (err, data) => {
                const usersArr = JSON.parse(data);
                console.log(usersArr);
                for (let q = 0; q < usersArr.length; q++) {
                    if (name == usersArr[q].name) {
                        usersArr.splice(q, 1);
                        fs.writeFile('user.json', JSON.stringify(usersArr), err => {
                            res.end(JSON.stringify({
                                success: 1,
                                message: 'congratulations!'
                            }));
                            return;
                        })
                    }
                }
            })
        })
    }

    if (req.url == '/unique') {
        res.setHeader('content-type', 'application/json');
        let box = '';
        req.on('data', (data) => {
            box += data;
        })
        req.on('end', () => {
            const unique = querystring.parse(box);
            fs.readFile('user.json', (err, data) => {
                const uniqueArr = JSON.parse(data);
                for (let s = 0; s < uniqueArr.length; s++) {
                    console.log('222');
                    if (unique.name == uniqueArr[s].name) {
                        console.log('enter');
                        var extra = [];
                        var jokearr = uniqueArr[s];
                        console.log(jokearr);
                        extra.push(jokearr);
                        console.log('111');
                        fs.writeFile('unique.json', JSON.stringify(extra), err => {
                            res.end(JSON.stringify({
                                success: 1,
                                message: 'good job!'
                            }));
                            return;
                        })
                    }
                }
            })
        })
        return;
    }
    const urlobj = url.parse(req.url, true);
    if (urlobj.pathname == '/check') {
        res.setHeader('content-type', 'application/json');
        const bbb = fs.createReadStream('unique.json');
        bbb.pipe(res);
        return;
    }
    if (req.url == '/edit') {
        res.setHeader('content-type', 'application/json');
        let rewrite = '';
        req.on('data', (data) => {
            rewrite += data;
        })
        req.on('end', () => {
            const foolish = querystring.parse(rewrite);
            // const descript=JSON.parse(foolish);
            // console.log(foolish);
            fs.readFile('user.json', (err, data) => {
                const newArr = JSON.parse(data);
                // console.log(newArr);
                for (let n = 0; n < newArr.length; n++) {
                    if (foolish.name == newArr[n].name) {
                        newArr[n] = foolish;
                        fs.writeFile('user.json', JSON.stringify(newArr), err => {
                            res.end(JSON.stringify({
                                success: 1,
                                message: 'success'
                            }));
                            return;
                        })
                    }
                }
            })
        })
    }
if(req.url=='/find'){
res.setHeader('content-type','application/json');
let find='';
req.on('data',data=>{
find+=data;
})
req.on('end',()=>{
const search=querystring.parse(find);
// console.log(search);
const name=search.name;
const phone=search.phone;
// console.log(name);
// console.log(phone);
fs.readFile('user.json',(err,data)=>{
const userArray=JSON.parse(data);
for(let f=0;f<userArray.length;f++){
if(name==userArray[f].name||phone==userArray[f].phone){
    const objectarr=[];
const done=userArray[f];
objectarr.push(done)
console.log(done);
res.end(JSON.stringify(objectarr));
return;
}
}
})
})
}
})









server.listen(3001);