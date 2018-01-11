$.post('/home', function (res) {

    console.log(res.length);
    var main = template('add', {
        data: res
    });
   
    // console.log(main);
    $('tbody').append(main);
var p=Math.ceil (res.length%5); 
$('.append').css({
    display:'none',
})
for(a=1;a<=p;a++){
$('.page').append('<button class=""><a>'+a+'</a></button>');
}
$('.append:eq('+(a*5+0)+')').show();
 
$('')







    $('.append').click(function () {
        var name = $(this).find('.name').html();
        $('#delete').click(function () {
            var value = {
                name: name
            };
            $.post('/delete', value, function (response) {
                if (response.success == 1) {
                    alert('该生已被删除！');
                    location.href = 'home.html';
                }
            })
        })
    })
    $('.append').click(function () {
        var name = $(this).find('.name').html();
        $('.edit').click(function () {
            var value = {
                name: name
            };
            $.post('/unique', value, function (response) {
                location.href = 'edit.html';
            })
        })
    })
})
$('form').submit(function(event){
    event.preventDefault();
    var name =$('input:text:eq(0)').val();
    var phone=$('input:text:eq(1)').val();
    var ways={name:name,phone:phone};
    $.post('/find',ways,function(res1){

    console.log(res1);
    $('tbody>tr:eq(0)').siblings().remove();
    var main = template('add',{data:res1});
    console.log(main);
    $('tbody').append(main);
    })
    })
    

   