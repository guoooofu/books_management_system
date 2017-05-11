var mongoose=require("mongoose")
var BookSchema=require("../schemas/book")
var BookModel=mongoose.model("Book",BookSchema)

module.exports=BookModel
