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



app.get('/', function (req, res) {
  res.render('index', {homes: null, error: null});
})

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/'+ req.params.partialPath); 
});

const request = require('request');
var convert = require('xml-js');

//...
//...

app.post('/', function (req, res) {
    
const apiKey = 'X1-ZWz1dyb53fdhjf_6jziz';
   
  let address = req.body.address;
  console.log("Inside post");
    console.log(address);
    var addressSplit = address.split(',');
    var length = addressSplit.length;
    var streetAddress = '';
    var citystate = addressSplit[length - 3]+', '+addressSplit[length - 2];
    for(var i=0; i < length-3; i++) {
     streetAddress += addressSplit[i];
     if(i < length - 4);
        streetAddress += ', ';
    }
  let url = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${apiKey}&address=${streetAddress}&citystatezip=${citystate}`;
  let home = null;
request(url, function (err, response, body) {
    if(err){
      res.render('index', {homes: null, error: 'Error, please try again'});
    } else {
      
      var bodyJSON = convert.xml2json(body, {compact: true, spaces: 4});
      var parseJSON = JSON.parse(bodyJSON);
        console.log(parseJSON);
      home = parseJSON['results'];
        
      res.render('index', {homes: home, error: null});
     /* if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(weatherText);
        res.render('index', {weather: weatherText, error: null});
      }*/
    }
  });
})



var port = 3030;
app.listen(port);
console.log("Listening on"+port);