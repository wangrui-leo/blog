var mongoose = require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
//链接数据库
mongoose.connect('mongodb://127.0.0.1/blog');
//数据库集合的骨架模型,固定了集合
var userSchema = new mongoose.Schema({
        username: {type:String,require:true},
        password: {type:Number,require:true},
        email: String,
        avatar:String,
        artTitle:String,
        artContent:String
    },
    //数据库中集合的名称   user
    {collection: 'users'});
//定义可以操作的数据库模型
var artsSchema = new mongoose.Schema({
        author: {type:ObjectId,ref:'User'},
        time: {type:Date,default:Date.now},
        artContent: String,
        artTitle:String
    },
    //数据库中集合的名称   user
    {collection: 'arts'});
//定义可以操作的数据库模型
exports.Arts = mongoose.model('Arts', artsSchema);
exports.User = mongoose.model('User', userSchema);
