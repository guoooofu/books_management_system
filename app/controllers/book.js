var _ = require("underscore");
var BookModel = require("../models/book");
//showAddBook-录入图书页面
exports.showAddBook = function (req, res) {
    res.render("addBook_admin.pug", {
        title: "新书入库"
    });
}
//saveBook-录入图书操作
exports.saveBook = function (req, res) {
    var BookId = req.body._id;
    var BookObj = req.body;
    var BookEntity=null;
    if(BookId){
        BookModel.findById(BookId,function (err, book) {
            if(err) throw err;
            BookEntity=_.extend(book,BookObj);
            BookEntity.save(function (err, book) {
                if(err) throw err;
                res.redirect("/admin")
            })
        })
    }else{
        BookEntity=new BookModel(BookObj);
        BookEntity.save(function (err, book) {
            if(err) throw err;
            res.redirect("/admin")
        })
    }
}
