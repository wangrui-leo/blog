var express=require('express');


var multer = require('multer');
//指定上传的目录
var upload = multer({dest:'public/upload'});

var path=require('path');
var router=express.Router();
var User=require('../model').User;

router.get('/signup',function(req,res){
    res.render('user/signup.html',{title:'用户注册'})//取出之后全部销毁
});
router.get('/signin',function (req,res) {
    res.render('user/signin',{title:'用户登录'});
});
router.get('/signout',function (req,res) {
    req.session.user=null;
    res.redirect('/');
});


router.post('/signup',upload.single('avatar'),function(req,res){
    var user = req.body;//{username,password,email}
    user.avatar =  '/upload/'+req.file.filename;
    User.create(user,function(err,doc){
        if(err){
            //req.session.error = '注册失败'
            req.flash('error','注册失败');
            res.redirect('back');
        }else{
            req.flash('success','恭喜你注册成功');
            res.redirect('/user/signin');
        }
    });
});

router.post('/signin',function (req,res) {
    var user=req.body;
    User.findOne(user,function (err,doc) {
        if(err){
            req.flash('error','用户名或密码错误');
            res.redirect('back');
        }else{
           if(doc){
               req.flash('success','用户登录成功');
               req.session.user=doc;
               res.redirect('/');
           }else{
               req.flash('error','用户名或密码错误');
               res.redirect('back');
           }
        }
    });
});






module.exports=router;