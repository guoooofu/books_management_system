var express = require('express');
var router = express.Router();
var bookController=require("../app/controllers/book")

router.get("/admin/addBook",bookController.showAddBook)
router.post("/admin/saveBook",bookController.saveBook)
module.exports = router;
