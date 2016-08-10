var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res){
   jobsData.findJobs().then(function(collection){
       res.send(collection);
   })
});

app.get('*', function(req, res){
    res.render('index');
});


//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://test:test@ds145395.mlab.com:45395/jobfinder-rr')
.then(function(){
   console.log("connected to mongodb successfully"); 
   jobsData.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);