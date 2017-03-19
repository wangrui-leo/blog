var express=require('express');

var flash = require('connect-flash');
var user=require('./routes/user');
var art=require('./routes/art');
var index=require('./routes/index');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');





var app=express();
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
//bodyParser
app.use(bodyParser.urlencoded({extended:true}));
//session
app.use(session({
    resave:true,//每次客户端访问服务器的时候不管有没有修改session都要重新保存session
    saveUninitialized:true,//保存未操作过的session
    secret:'moon' //服务器往客户端发送的时候会对cookie进行加密，以后每次客户端再访问服务器的时候，服务器会校验加密,如果校验通过，那么就使用数据，如果较验不通过，则认为是被篡改过的数据
}));
//req.flash(type,msg);  设置值   req.flash(msg);  取值
app.use(flash());


//设置模板引擎
app.set('view engine','html');
//设置模板存放目录
app.set('views',path.resolve('html'));
//设置模板渲染方法
app.engine('html',require('ejs').__express);
//公用信息的中间件
app.use(function (req,res,next) {
    res.locals.user=req.session.user;
    res.locals.error=req.flash('error').toString();
    res.locals.success=req.flash('success').toString();
    next();
});

app.use('/user',user);
app.use('/art',art);
app.use('/',index);







app.listen(8080);