var UserModel=require("../models/user");

//showSignin-显示登录页面
exports.showSignin=function (req,res){
  res.render("signin.pug",{
    title:"用户登录"
  });
}
//showSignup-显示注册页面
exports.showSignup=function (req,res){
  res.render("signup.pug",{
    title:"用户注册"
  });
}
//showEditProfile-显示编辑个人资料的页面
exports.showEditProfile=function(req,res){
  res.render("editProfile.pug",{
    title:"编辑个人资料"
  });
}
//signin-接收到登录的相关数据并进行处理
exports.signin=function (req,res){
  var UserObj=req.body;
  var name=UserObj.name;
  var password=UserObj.password;
  UserModel.findOne({name:name},function(err,user){
    if(err) console.log(err)
    //用户不存在-用户未注册、被管理员删除了
    if(!user){
      return res.redirect("/signup");
    }
    user.comparePassword(password,function (err, isMatch) {
        if(err){console.log(err)}

        if(isMatch){//密码匹配上，登录成功
            //利用session，保持用户状态
            req.session.user=user;
            return res.redirect("/");
        }else {
            res.redirect("/signin")
        }
    })
  })
}
//signup-接收到注册相关数据并进行处理
exports.signup=function (req,res){
  var UserObj=req.body;
  if(UserObj&& typeof UserObj.name!==undefined){
    UserModel.findOne({name:UserObj.name},function (err, user) {
        if(err){console.log(err)}
        if(user){//用户名被注册
            return res.redirect("/signin");
        }else{//用户名未被注册
            var UserEntity=new UserModel({
                name:UserObj.name,
                password:UserObj.password
            });
            UserEntity.save(function (err, user) {
                if(err){console.log(err)}
                req.session.user=user;
                res.redirect("/signin");
            })
        }
    })
  }
}
//signout 用户退出登录
exports.signout=function(req,res){
  delete req.session.user;
  res.redirect("/");
}

//showAdmin-显示后台管理主页面
exports.showAdmin=function(req,res){
  res.render("index_admin.pug",{
    title:"后台管理"
  });
}
