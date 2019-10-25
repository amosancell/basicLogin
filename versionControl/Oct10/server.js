var userInfo = {users:[["amosancell","hello"]]};
var uname = "amosancell";
var password = "hello";

// helpers
function aEqual(a,b) {
    if(a.length != b.length) {
        return false;
    }
    for(let i=0; i < a.length; i++) {
        if(a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

function arrInArr(sub, arr) {
    for(let i=0; i < arr.length; i++) {
        if(aEqual(sub,arr[i])) {
            return true;
        }
    }
    return false;
}

var express = require('express');
var cors = require('cors')

var app = express();
app.use(express.urlencoded());
app.use(express.json()); 

app.post('/post', cors(), function(req, res) {
    /*console.log([req.body.userName,req.body.password],userInfo.users);
    console.log(arrInArr([req.body.userName,req.body.password],userInfo.users));
    var data = {"success":arrInArr([req.body.userName,req.body.password],userInfo.users),"userName":req.body.userName,"password":req.body.password};
    res.send(data);*/
    var data = {"success":req.body.userName == uname && req.body.password == password,"userName":req.body.userName,"password":req.body.password}
    res.send(data);
});

app.post('/changeLoginInfo', cors(), function(res, req) {
    
});

app.listen(3000);
console.log("Listening at localhost:3000")
