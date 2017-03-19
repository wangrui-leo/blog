/**
 *
 * @param req
 * @param res
 * @param next
 */

exports.checkMustLogin=function (req,res,next) {
    if(req.session.user){
        next()
    }else{
        req.flash('error','你未登录');
        res.redirect('/user/signin');
    }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */

exports.checkNotLogin=function (req,res,next) {
    if(req.session.user){
        req.flash('error','你已经登录');
        res.redirect('/');
    }else{
        next();
    }
};



