var express=require('express');
var router=express.Router();
var Arts=require('../model').Arts;


router.get('/list',function (req,res) {
    Arts.find({},function (err,doc) {
        if(err){
            req.flash('error','用户名或密码错误');
            res.redirect('back');
        }else{
            if(doc){
                req.flash('success','用户登录成功');
                req.session.user=doc;
                res.redirect('/');
            }
        }
    });
    res.render('art/list.html',{title:'文章列表页面'});
});
router.get('/add',function (req,res) {
    res.render('art/add.html',{title:'发表文章页面'});
});

router.post('/add',function (req,res) {
    var arts = req.body;//{username,password,email}
    arts.author=req.session.user._id;
    Arts.create(arts,function(err,doc){
        if(err){
            req.flash('error','添加失败');
            res.redirect('back');
        }else{
            req.flash('success','恭喜你添加成功');
            res.redirect('/');
        }
    });
});


module.exports=router;