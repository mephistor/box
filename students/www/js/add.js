$('form').submit(function(event){
event.preventDefault();
var value=$(this).serialize();
$.post('/add',value,function(res){
if(res.succsee==1){
    alert('添加成功！');
    location.href='home.html';
}
else{
    alert('用户名已存在！');
    $('input,textarea').val('');
}
})
})