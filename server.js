var express= require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.render('index'); 
});

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/'+ req.params.partialPath); 
});

//const request = require('request');

//...
//...
/*
app.post('/', function (req, res) {
    
  const zwsID = 'X1-ZWz1gc0tjgqnez_5rw5j';
const apiKey = 'X1-ZWz1dyb53fdhjf_6jziz';
    /*
  let address = req.body.address;
  let addressSplit = address.split(",");
  
  let url = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zwsID}&address=${address}&appid=${apiKey}`;
  let weather = null;
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      console.log(weather);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(weatherText);
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
*/


var port = 3030;
app.listen(port);
console.log("Listening on"+port);