$('form').submit(function(event){
event.preventDefault();
$.post('/add',$(this).serialize(),function(res){
    if(res.code==1){
        location.href='index.html';
    }
})
})