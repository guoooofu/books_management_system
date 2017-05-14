$(document).ready(function() {
  var currentPage = 1;
  init(currentPage);
  //图书列表及分页
  function init(currentPage) {
    $.ajax({
      type: "GET",
      url: "/admin/bookList/" + currentPage,
      async: false,
      success: function(result) {
        bookResult(result)
        var $pagination = $("#pagination");
        $pagination.Paging({
          pagesize: result.limit,
          count: result.total,
          current: currentPage,
          callback: function(page) {
            $('tbody').html('')
            $pagination.html('');
            //翻页时的回调方法，page为当前页码
            currentPage = page;
            init(currentPage);
          }
        })
      }
    })
  }

  //点击"搜索"，展示搜索结果
  $(".search").on("click",function(){
    var key=$("#searchInput").val();
    $.ajax({
      type:"GET",
      url:"/book/search?key="+key,
      success:function(result){
        console.log(result)
        // bookResult(result)
      },
      error:function(err){
        console.log(err)
      }
    })
  })

  //点击"删除"按钮，进行相关操作
  $(".delete").on("click", function() {
    var id = $(this).attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/admin/book/:" + id,
      success: function(result) {
        console.log(result)
        var tr = $('tr[data-id=' + id + ']');
        tr.remove();
        init(currentPage);
      }
    })
  })

  // 点击"详细"按钮，展示图书相应的数据
  $(".detail").on("click", function() {
    var id = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/book/" + id,
      success: function(result) {
        $("#reviseBook").attr({"data-id": id});
        $(".form-group").addClass("pmd-textfield-floating-label-completed")
        $("#number").val(result.number);
        $("#title").val(result.title);
        $("#author").val(result.author);
        $("#translator").val(result.translator);
        $("#publisher").val(result.publisher);
        $("#price").val(result.price);
        $("#pages").val(result.pages);
        $("#pubdate").val(result.pubdate);
        $("#summary").val(result.summary);
      },
      error: function(err) {
        throw err;
      }
    })
  })

  //点击"修改"按钮，修改图书数据
  $(".revise").on("click", function() {
    var id = $("#reviseBook").attr("data-id");
    var formData = new FormData($("#reviseBook")[0]);
    $.ajax({
      type: "POST",
      url: "/admin/book/" + id,
      data: formData,
      enctype: "application/x-www-form-urlencoded",
      processData: false, // 告诉jQuery不要去处理发送的数据
      contentType: false, // 告诉jQuery不要去设置Content-Type请求头
      success: function(result) {
        $("#book_detail").modal('hide');
        newBooks(id);
        console.log(result)
      }
    })
  })

  //更新图书列表中的数据
  function newBooks(id) {
    $.ajax({
      type: "GET",
      url: "/admin/reloadBook/" + id,
      success: function(book) {
        var tr = $('tr[data-id=' + book._id + ']');
        tr.find(".title").text(book.title);
        tr.find(".author").text(book.author);
        tr.find(".pubdate").text(book.pubdate);
        tr.find(".updateAt").text(book.updateAt);
      }
    })
  }

  //图书查询结果-列表显示、分页、关键字
  function bookResult(result){
    if(result.docs.length>0){
      for (var i = 0; i < result.docs.length; i++) {
        $('tbody').append(`<tr data-id= ${result.docs[i]._id}>
          <td>${i + 1}</td>
          <td class="nubmer">${result.docs[i].number}</td>
          <td class="title">${result.docs[i].title}</td>
          <td class="author">${result.docs[i].author}</td>
          <td class="pubdate">${result.docs[i].pubdate}</td>
          <td class="createAt">${result.docs[i].createAt.substring(0, result.docs[i].createAt.indexOf("T"))}</td>
          <td class="updateAt">${result.docs[i].updateAt.substring(0, result.docs[i].updateAt.indexOf("T"))}</td>
          <td>
            <button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm detail"  data-id= ${result.docs[i]._id} data-target="#book_detail" data-toggle="modal">
              <i class="fa fa-pencil fa-lg"></i>
            </button>
            <button class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm delete"  data-id= ${result.docs[i]._id} data-target="#book_detail" data-toggle="modal">
              <i class="fa fa-trash-o fa-lg"></i>
            </button>
          </td>
        </tr>`)
      }
    }else{
      $('tbody').append(`
        <tr>
          <td colspan="8">空空如也
            <a class="btn btn-xs pmd-btn-outline pmd-ripple-effect btn-primary" href="/admin/addBook">录入图书</a>
          </td>
        </tr>
      `)
    }}
})
