var mongoose = require('mongoose');
//链接数据库
mongoose.connect('mongodb://127.0.0.1/blog');
//数据库集合的骨架模型,固定了集合
var userSchema = new mongoose.Schema({
        username: {type:String,require:true},
        password: {type:Number,require:true},
        email: String,
        avatar:String
    },
    //数据库中集合的名称   user
    {collection: 'users'});
//定义可以操作的数据库模型
exports.User = mongoose.model('Person', userSchema);