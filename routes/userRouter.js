var express = require('express');
var router = express.Router();
var userController=require("../app/controllers/user")
// general user
router.get("/signup",userController.showSignup)
router.get("/signin",userController.showSignin)
router.get("/signout",userController.signout)
router.get("/editProfile",userController.showEditProfile)
router.post("/user/editProfile",userController.editProfile)
router.post("/user/signup",userController.signup)
router.post("/user/signin",userController.signin)
// admin
router.get("/admin",userController.showAdmin)
module.exports = router;
