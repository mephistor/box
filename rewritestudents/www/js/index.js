$.get('/all',function(res){
$('#all').html(res);
})
function deleteUser(id,event){
$.get('/remove',{id},function(res){
$(event.target).parent().remove();

})
}