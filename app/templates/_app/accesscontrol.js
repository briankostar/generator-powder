module.exports = function(app) {
    // check for auth in every request
    app.all('*', function(req,res,next) {<% if(addAuth) { %>
        var unauthAllowedRoutes = ['/auth', '/register', '/auth/login', '/auth/register', '/api/'];
        var url = req.url.split('?')[0];

        // if route is allowed w/o reg
        if(unauthAllowedRoutes.indexOf(url) !== -1) {
            return next();
        } else if(req.user) {
            return next();
        } else {
            return next(new Error(401));
        }<% } else { %>
        // add your auth url checks here
        return next();<% } %>
    });
};
