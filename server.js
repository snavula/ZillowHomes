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

const XMLExtract = require('xml-extract');

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
      var bodyJSON = convert.xml2json(body, {compact: false, spaces: 4});
     
        
        
        XMLExtract(body, 'results', false, (error, element) => {
  if (error) {
    throw new Error(error);
  }
 
   
  console.log(element);
   res.render('index', {homes: element, error: null});
 
  // output:  
  // http://www.example.com/1 
  // http://www.example.com/2 
  // http://www.example.com/3 
});
        
        
      
    }
  });
})



var port = 3030;
app.listen(port);
console.log("Listening on"+port);