$('form').submit(function(event){
event.preventDefault();

var value=$(this).serialize();
console.log(value);
$.get('/login?'+value+'',function(res){
console.log(res);
if(res.code==1){
    alert('登录成功！')
    location.href='show.html';
}
if(res.message=='密码错误！'){
    alert('密码错误！');
    // location.href='index.html';
}
if(res.message=='用户名不存在！'){
    alert('用户名不存在！');
    // location.href='index.html';
}
})


})