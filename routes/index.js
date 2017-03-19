var express=require('express');
var router=express.Router();
var Arts=require('../model').Arts;



router.get('/',function(req,res){
    Arts.find({}).populate('author').exec(function(err,articles){
        res.render('index',{title:'首页',articles:articles});
    });
});

module.exports=router;