var express=require('express');
var router=express.Router();
var ware=require('../ware');
var Arts=require('../model').Arts;


router.get('/add',ware.checkMustLogin,function (req,res) {
    res.render('art/add.html',{title:'发表文章页面'});
});

router.get('/detail/:_id',function (req,res,next) {
    var _id=req.param._id;
    Arts.findById(_id,function(err,doc){
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            res.render('/arts/detail',{arts:doc});
        }
    });
    res.render('art/add.html',{title:'发表文章页面'});
});
router.post('/add',ware.checkMustLogin,function (req,res) {
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