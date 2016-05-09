var express = require('express');
var app = express();
var connect = require('connect');
var path = require('path');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var ejs = require("ejs");
var MongoClient = require('mongodb').MongoClient;
var db = null;
 MongoClient.connect('mongodb://localhost:27017/hlsc',function(err,db1){
     db=db1
 })

var pw = "12345"

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('views', './views');
app.set('view engine', 'ejs');
 //app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {res.sendFile(__dirname+"/public/login.html");});

app.post('/',function(req,res){
    
})

app.post('/login',urlencodedParser,function(req,res){
    if(req.body.pw == "12345"){
        db.collection('items').find({}).toArray(function(err,doc){
        if(err) throw err;
        res.render('app',{
            data : doc,
            title : "title"
        });
        
        });
    }else{
        res.send('login failed');
    }
})

//app.use(express.cookieDecoder());
app.use(session({
  key: 'sid', // 세션키
  secret: 'secret', // 비밀키
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));


var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'ln',
    password : 'ln',
    database:'ln'
});


app.listen(process.env.PORT || 3000 , function () {
  console.log('Example app listening on port ',process.env.PORT || 3000);
});