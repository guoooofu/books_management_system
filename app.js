var express=require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var port=process.env.PORT||3000;
var app = express();
var dbUrl="mongodb://localhost/imooc";
mongoose.connect(dbUrl);

// 设置视图引擎
app.set('views', path.join(__dirname, './app/views/pages'));
app.set('view engine', 'pug');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);


//捕获404错误并交给错误处理程序
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理程序
app.use(function(err, req, res, next) {
  // 设置locals-局部变量,只在开发环境时提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

require("./config/routes")(app);
