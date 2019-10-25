module.exports = function(app, cors, userName, password, userInfo) {


    app.get('/login', cors(), function(req, res) {
        if("error" in req.query && req.query.error == 'true') {
            var e = {message: "There was a problem with your username or password, try again!"};
        }
        else {
            var e = {message: ""};
        }
        res.render('login.ejs',{errorMssg: e});
    });

    app.get('/home', cors(), function(req, res) {
        res.render('home.ejs', {data: userInfo});
    });

    app.post('/loginPost', cors(), function(req, res) {
        
        //console.log("query", req.query);
        //console.log(req.body.userName, req.body.password, userInfo.password);
        var correctLogin = req.body.userName == userName && req.body.password == password;
        //console.log(correctLogin);
        //var data = {success:correctLogin, userName: req.body.userName, password: req.body.password};
        userInfo.loggedIn  = correctLogin;
        userInfo.userName = userName;
        userInfo.password = password;
        if(userInfo.loggedIn) {
            res.render('home.ejs', {data: userInfo});
        }
        else {
            res.redirect("/login?error=true");
        }
        
    });

    app.post('/infoPost', cors(), function(req, res) {
        userInfo.age = req.body.age;
        userInfo.favFood = req.body.favFood;
        res.render('home.ejs', {data: userInfo});
    });

    app.get('/changePassLink', cors(), function(req, res) {
        console.log(req.query, req.query.success, typeof req.query.success);
        if("success" in req.query) {
            if(req.query.success == 'true') {
                var mssg = {message: "Success! Your password has been changed!"};
            }
            else {
                var mssg = {message: "An error has occurred, plase try again."};
            }
            res.render('changePass.ejs',{mssg: mssg});
        }
        else {
            res.render('changePass.ejs');
        }
    });

    app.post('/changePass', cors(), function(req, res) {
        console.log(req.body.oldPass, userInfo.password, req.body.confPass);
        if(req.body.oldPass != userInfo.password) {
            //res.send("Wrong Password")
            res.redirect("/changePassLink?success=false");
        }
        else if(req.body.newPass != req.body.confPass) {
            //res.send("Confirmation password did not match new Password, try again");
            res.redirect("/changePassLink?success=false");
        }
        else {
            password = req.body.newPass;
            userInfo.password = req.body.newPass;
            //res.send("Success! Your password has been changed");
            res.redirect("/changePassLink?success=true")
        }
    });
}