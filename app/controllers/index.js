var mongoose = require('mongoose');

exports.index=function(req,res){
    res.render("index",{
        title:"图书管理系统 首页"
    });
}
