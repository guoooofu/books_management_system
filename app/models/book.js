var mongoose=require("mongoose")
var BookSchema=require("../schemas/book")
var BookModel=mongoose.model("Book",BookSchema)
/**
 * bug：最先开始name字段被设置为unique了，后来删除了该字段。导致之后无法存储book相关字段，因为name值默认为null了
 * debug:
 *       方法1：mongodb: bd.collectionname.dropIndexex()
 *       方法2：mongoose: myModel.collection.dropIndexes(callback)
 * */
BookModel.collection.dropIndexes(function (err, results) {
    if(err) throw err;
});
module.exports=BookModel
