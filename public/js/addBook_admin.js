$(document).ready(function(){
  $("#number")
  .focus()
  .blur(function(){
    var douban = $(this)
    var id = $(this).val()
    if (id) {
        $.ajax({
            url: 'https://api.douban.com/v2/book/' + id,
            cache: true,
            type: 'get',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'callback',
            success: function(data) {
                $('#title').val(data.title)
                $('#author').val(data.author)
                $('#translator').val(data.translator)
                $('#pubdate').val(data.pubdate)
                $('#image').val(data.images.large)
                $('#summary').val(data.summary)
                $('#pages').val(data.pages)
                $('#price').val(data.price)
                $('#publisher').val(data.publisher)
                $('#image').val(data.images.medium)
                if($('input').val()){
                  $('.form-group').attr({class:"form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed"})
                }
            }
        })
    }
  })
})
