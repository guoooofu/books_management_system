var mongoose = require("mongoose")
var Schema=mongoose.Schema;
var bcrypt = require("bcrypt")//专门为密码存储设计的算法
var SALT_WORK_FACTOR = 10;//密码轻度

var UserSchema = new Schema({
    name:{
        unique: true,
        type: String
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', function(next) {
    var user = this

    if (this.isNew) {
        this.createAt = this.updateAt = Date.now()
    }
    else {
        this.updateAt = Date.now()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

//实例方法：通过该实例可以调用
UserSchema.methods = {
    //_password：用户提交过来的数据
    comparePassword: function(_password, currentdb) {
        //利用bcrypt进行密码的校对，this.password：当前数据库中的密码
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) return currentdb(err)

            currentdb(null, isMatch)
        })
    }
}

//静态方法：通过该模型就可以调用
UserSchema.statics = {
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


module.exports = UserSchema
