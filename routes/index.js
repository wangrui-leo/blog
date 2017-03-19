var express=require('express');
var router=express.Router();
router.get('/',function(req,res){
    res.render('index.html',{title:'首页'});
});

module.exports=router;