$.get('/check', function (res) {
    var here = res[0];
    $('input:text').val(here.name);
    $('select').val(here.age);
    $('input[name=phone]').val(here.phone);
    $('input[name=email]').val(here.email);
    $('textarea').val(here.introduce);
})


$('form').submit(function (event) {
    event.preventDefault();
    var value = $(this).serialize();
    $.post('/edit', value, function (res) {
if(res.success==1){
alert('修改成功！');
location.href='home.html';
}


    })


})