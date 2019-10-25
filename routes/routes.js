module.exports = function(app, cors, userName, password, userInfo) {

    var currentUser;

    //import the User object
    var User = require('../Models/user.js');

    app.get('/home', cors(), function(req, res) {
        if(!currentUser) {
            res.redirect('/login');
        }
        else {
            res.render('home.ejs', {user: currentUser});
        }
    });

    app.get('/login', cors(), function(req, res) {
        if("error" in req.query && req.query.error == 'true') {
            var e = {message: "There was a problem with your username or password, try again!"};
        }
        else {
            var e = {message: ""};
        }
        res.render('login.ejs',{errorMssg: e});
    });

    app.get('/createUser', cors(), function(req, res) {
        console.log('hit /createUser');
        if("success" in req.query && req.query.success == 'true') {
            var m = {success: true, message: "Success! Your account has been created"};
        }
        else if ("success" in req.query && req.query.success == 'false') {
            var m = {success: false, message: "There was an error, please try again with a different username/pasword"};
        }
        else {
            var m = {success: false, message: ""};
        }
        res.render('createUser.ejs', {data: m});
    });

    app.post('/makeUser', cors(), function(req, res) {
        console.log('makeUser',{userName: req.body.userName, password: req.body.password});
        User.findOne({userName: req.body.userName, password: req.body.password}, function(error, user) {
            if(error) {
                console.log("error in /makeUser");
                res.redirect('/createUser?success=true');
            }
            else {
                // if user is null, aka if the login credentials were not found
                if(!user) {
                    var u = new User({userName: req.body.userName, password: req.body.password});
                    u.save(function(error,user) {
                        console.log("made user",user);
                        res.redirect('/createUser?success=true');
                    });
                }
                else {
                    console.log("user already exists");
                    res.redirect('/createUser?success=false');
                }
            }
        });
    });

    app.post('/loginPost', cors(), function(req, res) {
        /*
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
        }*/
        
        /*User.findOne({userName: req.body.userName, password: req.body.password}, function(error, user) {
            if(user) {
                console.log("found one", user);
                currentUser = user;
                res.render('home.ejs', {user:user});
            }
            else {
                console.log("didn't find one, will make new user");
                var u = new User({userName: req.body.userName, password: req.body.password});
                u.save(function(err, user) {
                    console.log("made new user: " + user);
                    currentUser = user;
                    res.render('home.ejs', {user:user});
                });
            }
        });*/
        User.findOne({userName: req.body.userName, password: req.body.password}, function(error, user) {
            /*if(error) {
                console.log("login failed, user not found");
                res.redirect("/login?error=true");
            }
            else {
                console.log("found user", user);
                currentUser = user;
                res.render('home.ejs', {user:user});
            }*/
            if(user) {
                console.log("found one", user);
                currentUser = user;
                res.render("home.ejs", {user: user});
            }
            else {
                console.log("login failed, user not found");
                res.redirect("/login?error=true");
            }
        });
        
    });

    app.post('/infoPost', cors(), function(req, res) {
        User.findOne({userName: currentUser.userName, password: currentUser.password}, function(error, user) {
            if(error) {
                console.log("error has occurres in /infoPost");
                res.redirect('/home');
            }
            else {
                if(!user) {
                    console.log('user not found in /infoPost');
                    res.redirect('/home');
                }
                else {
                    user.name = req.body.name;
                    user.age = req.body.age;
                    currentUser = user;
                    user.save(function(error,user) {
                        res.redirect('/home');
                    });
                }
            }
        });
        /*userInfo.age = req.body.age;
        userInfo.favFood = req.body.favFood;
        res.render('home.ejs', {user: currentUser});*/
    });

    app.get('/changePassLink', cors(), function(req, res) {
        console.log(req.query, req.query.success, typeof req.query.success);
        if("success" in req.query) {
            if(req.query.success == 'true') {
                var mssg = {success: true, message: "Success! Your password has been changed!"};
            }
            else {
                var mssg = {success: false, message: "An error has occurred, please try again."};
            }
            res.render('changePass.ejs',{mssg: mssg});
        }
        else {
            res.render('changePass.ejs');
        }
    });

    app.post('/changePass', cors(), function(req, res) {
        /*console.log(req.body.oldPass, userInfo.password, req.body.confPass);
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
        }*/
        console.log("currentUser",{username: currentUser.userName, password: req.body.oldPass});
        User.findOne({userName: currentUser.userName, password: req.body.oldPass}, function(error,user) {
            if(error) {
                console.log("an error occurred in /changePass");
                res.redirect("/changePassLink?success=false");
            }
            else {
                if(!user) {
                    console.log("user not found");
                    res.redirect("/changePassLink?success=false");
                }
                else {
                    console.log("changePass user", user);
                    if(req.body.newPass == req.body.confPass) {
                        user.password = req.body.newPass;
                        currentUser = user;
                        user.save(function(error,user) {
                            res.redirect('/changePassLink?success=true')
                        });
                    }
                    else {
                        res.redirect('/changePassLink?success=false');
                    }
                }
            }
        });
    });

    app.get('/userInfo', cors(), function(req, res) {
        res.render('userInfo.ejs', {userInfo: {userList: []}});
    });
    
    app.post('/getUserInfo', cors(), function(req, res) {
        console.log("start /getUserInfo");
        User.find({}, function(error, users) {
            if(error) {
                console.log("an error has occured");
                res.redirect("/userInfo");
            }
            else {
                console.log('find results', typeof users, users);
                res.render('userInfo.ejs', {userInfo: {userList: users}});
            }
        });
        console.log("end /getUserInfo");
    });
}