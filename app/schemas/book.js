var mongoose = require("mongoose")
var Schema= mongoose.Schema;
var BookSchema = new Schema({
    number:String,
    title:{
        unique: true,
        type: String
    },
    author:String,
    translator:String,
    publisher:String,
    price:String,
    pages:String,
    pubdate:String,
    image:String,
    summary:String
    // createAt: {
    //     type: Date,
    //     default: Date.now()
    // },
    // updateAt: {
    //     type: Date,
    //     default: Date.now()
    // }
})

BookSchema.pre('save', function(next) {
    var book = this

    if (this.isNew) {
        this.createAt = this.updateAt = Date.now()
    }
    else {
        this.updateAt = Date.now()
    }
})

//静态方法：通过该模型就可以调用
BookSchema.statics = {
    fetch: function (currentdb) {
        return this
            .find({})
            .sort("updateAt")
            .exec(currentdb)
    },
    findById: function (id, cbcurrentdb) {
        return this
            .findOne({_id: id})
            .exec(cbcurrentdb)
    }
}


module.exports = BookSchema
