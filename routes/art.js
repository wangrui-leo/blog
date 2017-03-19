var express=require('express');
var router=express.Router();
var ware=require('../ware');
var Arts=require('../model').Arts;


router.get('/add',ware.checkMustLogin,function (req,res) {
    res.render('art/add.html',{title:'发表文章页面',article:{}});
});


router.get('/detail/:_id',function(req,res){
    var _id = req.params._id;//先得到路径里的ID
    //根据ID查找对应的文章
    Arts.findById(_id,function(err,article){
        if(err){
            res.redirect('back');
        }else{
            //渲染详情页
            res.render('art/detail',{title:'文章详情',article:article});
        }
    })
});

router.get('/update/:_id',function(req,res){
    var _id = req.params._id;//先得到路径里的ID
    Arts.findById(_id,function(err,article){
        if(err){
            res.redirect('back');
        }else{
            console.log(article)
            res.render('art/add',{title:'文章详情',article:article});
        }
    })
});


router.get('/delete/:_id',function (req,res,next) {
    var _id=req.params._id;
    console.log(_id)
    Arts.remove({_id},function(err,doc){
        if(err){
            req.flash('error','删除失败');
            res.redirect('back');
        }else{
            req.flash('error','删除成功');
            res.redirect('/');
        }
    });
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
router.post('/update/:_id',ware.checkMustLogin,function (req,res) {
    var _id=req.params._id;
    Arts.update({_id:_id},req.body,function(err,doc){
        if(err){
            req.flash('error','添加失败');
            res.redirect('back');
        }else{
            req.flash('success','恭喜你更新成功');
            res.redirect(`/art/detail/${_id}`);
        }
    });
});


module.exports=router;