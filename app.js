var express = require("express");
var mongoose=require("mongoose");
mongoose.Promise = global.Promise = require('bluebird');
var path=require("path");
var bodyParser = require('body-parser')
var cookiParser=require("cookie-parser");
var logger = require('morgan');
var multipart=require("connect-multiparty");
var session=require("express-session");
var mongoStore=require("connect-mongo")(session);

var port=process.env.PORT||3000;
var env=process.env.NODE_ENV||"development";
var dbUrl="mongodb://localhost/graduationDesign";
var app = express();
app.listen(port);

var indexRouter = require('./routes/indexRouter');
var userRouter = require('./routes/userRouter');
var bookRouter = require('./routes/bookRouter')

// 连接数据库
// var options = { promiseLibrary: require('bluebird') };
// var db = mongoose.createConnection(dbUrl, options);
// db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect(dbUrl);

// 公用中间件
app.set("views","./app/views/pages");
app.set("view engine","pug");
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multipart());//用于文件上传
app.use(cookiParser());//session中间件依赖于cookieParser
app.use(session({
    secret:"graduationDesign",
    store:new mongoStore({
        url:dbUrl,
        collection:"sessions"
    })
}))
app.locals.moment=require("moment");
app.use(function(req,res,next){
  res.locals.user = req.session.user || null;
  next();
})

// 路由中间件
app.use(indexRouter);
app.use(userRouter);
app.use(bookRouter);

if("development"===env){//如果env为本地开发环境
    app.set("showStackError",true)//报错的时候，将其打印出来
    app.use(logger(":method :url :status"))//显示请求的类型、路径、状态
    app.locals.pretty=true //页面的源码由压缩转为格式化后，提高可读性
    mongoose.set('debug', true)//开启debug模式,可以看到完整的执行过程
}
module.exports=app
