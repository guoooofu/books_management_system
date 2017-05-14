var express = require('express');
var router = express.Router();
var bookController=require("../app/controllers/book")

router.get("/book/search?",bookController.searchBook)
router.get("/book/:id",bookController.bookDetail)
router.get("/admin/addBook",bookController.showAddBook)
router.get("/admin/bookList",bookController.bookList)
router.get("/admin/bookList/:page",bookController.bookListPage)
router.get("/admin/reloadBook/:id",bookController.reloadBook)
router.post("/admin/saveBook",bookController.saveBook)
router.post("/admin/book/:id",bookController.reviseBook)
router.delete("/admin/book/:id",bookController.deleteBook)
module.exports = router;
