var requireRoles = {
    //To determine if the user have access
    requireRole: function(role){
        return function (req, res, next) {
            if (req.user && req.user.role > role) {
                next();
            }
            else if(req.user && req.user.role < role){
                res.redirect('/');
            }
            else {
                res.redirect('/user/login');
            }
        }
    }
}

module.exports = requireRoles;