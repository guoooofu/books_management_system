var _ = require("underscore");
var BookModel = require("../models/book");
//showAddBook-录入图书页面
exports.showAddBook = function(req, res) {
  res.render("addBook_admin.pug", {title: "新书入库"});
}
//bookList-图书列表展示
exports.bookList=function(req,res){
  res.render("bookList_admin.pug", {
    title: "图书列表"
  })
}
//bookListPage-图书列表分页查询
exports.bookListPage = function(req, res) {
  var currentPage=req.params.page;
  options={page: currentPage,limit: 3,sort:{"updateAt":-1}}
  BookModel.paginate({}, options,function(err, result) {
    if (err)
      throw err;
    return res.json(result)
  });
}
//reloadBook-修改完图书数据后重新加载
exports.reloadBook = function(req, res) {
  var id = req.params.id;
  BookModel.findOne({
    _id: id
  }, function(err, book) {
    if (err)
      throw err;
    return res.send(book);
  })
}
//bookDetail-图书详情
exports.bookDetail = function(req, res) {
  var id = req.params.id;
  BookModel.findById({
    _id: id
  }, function(err, book) {
    if (err)
      throw err;
    return res.json(book);
  });
}
//reviesBook-修改图书信息操作
exports.reviseBook = function(req, res) {
  var BookObj = req.body;
  var id = req.params.id;
  BookModel.update({
    _id: id
  }, BookObj, function(err) {
    if (err)
      throw err;
    return res.send("更新成功")
  })
}

//saveBook-录入图书操作
exports.saveBook = function(req, res) {
  var BookId = req.body._id;
  var BookObj = req.body;
  var BookEntity = null;
  if (BookId) {
    BookModel.findById(BookId, function(err, book) {
      if (err)
        throw err;
      BookEntity = _.extend(book, BookObj);
      BookEntity.save(function(err, book) {
        if (err)
          throw err;
        res.redirect("/admin/bookList")
      })
    })
  } else {
    BookEntity = new BookModel(BookObj);
    BookEntity.save(function(err, book) {
      if (err)
        throw err;
      res.redirect("/admin/bookList")
    })
  }
}
//deleteBook-删除图书操作
exports.deleteBook = function(req, res) {
  var id = req.params.id;
  var _id = id.slice(1);
  BookModel.remove({
    _id: _id
  }, function(err) {
    if (err)
      throw err;
    return res.send("删除成功")
  })
}
//
exports.searchBook=function(req,res){
  var keyword=req.query.key;
  var reg=new RegExp(keyword + '.*', 'i');
  options={page: 1,limit: 3,sort:{"updateAt":-1}}
  BookModel.paginate({$or:[
    {title:{$regex:reg}},
    {number:{$regex:reg}},
    {author:{$regex:reg}}
  ]}, options,function(err, result) {
    if (err)
      throw err;
    return res.json(result)
  });
}
