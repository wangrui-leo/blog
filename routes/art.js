var express=require('express');
var router=express.Router();

router.get('/list',function (req,res) {
    res.render('art/list.html',{title:'文章列表页面'});
});
router.get('/add',function (req,res) {
    res.render('art/add.html',{title:'发表文章页面'});
});




module.exports=router;