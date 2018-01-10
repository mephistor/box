$('form').submit(function(event){
event.preventDefault();
var password=$('input:password:eq(0)').val();
var password1=$('input:password:eq(1)').val();

if(password!=password1){
    alert('菜鸡，密码不一样！');
    $('input:password').val('');
    return;
}
const value=$(this).serialize();
console.log(value);
$.post('/signup',value,function(res){
console.log(res);
if(res.message=='用户名已存在！'){
    alert('用户名已存在！');
    $('input:text','input:password').val('');
}
if(res.code==1){
    alert('注册成功！现在将前往登录');
location.href='index.html';
}
})
})
$('input:text').on('input',function(){
var data=$(this).val();
console.log(data);
    $.get('all',function(res){
    console.log(res);
for(let i=0;i<res.length;i++){
    if(data==res[i].username){
        $('span:eq(0)').html('用户已存在！').show();
    }
    setTimeout(function(){
        $('span:eq(0)').html('用户已存在！').hide();
    },1000);
}    
    })    
    })
$('input:password:eq(1)').on('input',function(){
    var password=$('input:password:eq(0)').val();
    var password1=$('input:password:eq(1)').val();
var one=password[1];
var one1=password1[1];
console.log(one);
console.log(one1);
console.log(password);
console.log(password1);
   
        if(password.includes(password1)){
            $('span:eq(1)').html('请继续输入').show();
            setTimeout(function(){
                $('span:eq(1)').html('').hide();
            },1000);
        }
else{
    $('span:eq(1)').html('两次输入不一致').show();
    }
})
