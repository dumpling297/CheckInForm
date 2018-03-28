var express = require('express');
var app = express();
//var path = require('path');
var serverIndex = require('serve-index');
var http = require('http');
var port = process.env.PORT || 27222;
var users =[];
var database;


//mongodb://spaudel:1iaONvBW@127.0.0.1:27017/cmpt218_spaudel?authSource=admin
var mongoose = require('mongoose');
var MUrl = "mongodb://spaudel:1iaONvBW@127.0.0.1:27017/cmpt218_spaudel?authSource=admin";

var Schema = mongoose.Schema;
var scheme = new Schema({
  checkStr: String,
  User: String,
  idS: Number,
  time: String
})

var Student = mongoose.model('student',scheme);


/*mongoose.connect(MUrl);
var db = mongoose.connection;

db.on('error', function(){
  console.log("ERROR!");
});

db.once('open', function(){
  console.log('connection success');
});

// Schema is a constructor
var Schema = mongoose.Schema;
// instantiate the constructor
var StudentSchema = new Schema({
  Class: { type:String },
  Uname: { type:String },
  UserID: { type: String, minlength:12},
});
// create a new model
var User = mongoose.model('user', StudentSchema);

//example
var Bobby = new User({
  Class: 'cmpt218',
  Uname: 'bobbc',
  UserID: '1234'
});

Bobby.save(function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log("Your user has been saved!");
  }
});
*/


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: "login.html"
}

var t = function (){
  var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  }

//connection
app.use("/", function(req,res,next) {
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
})
app.all('/', function(req, res, next) {
  console.log('Root Folder...')
  next();
})
app.use('/', express.static('./Files', options));


//'time': Math.floor(Date.now() / 1000) // Time of save th

app.post('/admin-check', function(req,res,next) {
  //console.log(req.body);
  users=[];
  users.push(req.body);
  res.json(users);
});

app.post('/admin-land', function(req,res,rext){
  var str =[];
  str.push(req.body);
  res.json(str);
});

app.get('/admin-land', function(req,res,next){

});

app.post('/checkIn', function(req,res,next){
  var str =[];
  str.push(req.body);
  res.json(str);
})

//app.get('/savedPage', GetMessage);
app.post('/savedPage', function(req,res,next){

   Student.findOne({idS: req.body.idS}, function(err, existingUser){
     console.log("ive reached");
    if(existingUser){
      console.log("You already checked-In!");
      return res.status(409).send({message: 'Student ID aready checked'});
    } else {
      console.log(req.body);
      var msg = new Student(req.body);
      console.log(msg);
      msg.save(function(err, doc){
        if(err) {console.log("ERROR with saving data."); }
        else{
          console.log("saved!");
        }
    });
    res.status(200).end("Success!");
    }
  });
});

app.post('/history', function(req,res,next){
  var UserS = [];
  //UserS.push(req.body);
  Student.find({}).exec(function(err,result){
    result.forEach(function(person){
      UserS.push(person);
    });
      res.send(JSON.stringify(UserS));
  });

})

function GetMessage(req,res) {
  var UserS = [];
  //UserS.push(req.body);
  Student.find({}).exec(function(err,result){
    result.forEach(function(person){
      UserS.push(person.idS);
      UserS.push(person.User);
      //console.log(UserS);
    });
      console.log(UserS);
      //res.writeHead(200, { 'Content-Type': 'application/json' });
      //res.send(JSON.stringify(UserS));
      res.json(UserS);
  });
}

app.delete('/history/:id', function(req, res, next) {
    //search database for id
    /*users = users.filter(function(people) {
        return ((people.fname !== req.body.fname) || (people.lname !== req.body.lname));
    });*/
    var UserS =[]
    console.log(req.body.idS);
    Student.deleteOne({idS:req.body.idS}, function(err) {
      console.log("within");
      if(!err) {
        console.log("SUCCESS");
        Student.find({}).exec(function(err,result){
          result.forEach(function(person){
            UserS.push(person);
          });
            res.send(JSON.stringify(UserS));
        });
      } else {
        console.log("err");
      }
    });
});

mongoose.connect(MUrl, function(err, db){
  if(!err){
    console.log("Database Connected");
    database =db;
  }
});

http.createServer(app).listen(port);
console.log('running on port:', port);
