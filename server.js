
/**
 * Module dependencies.
 */

var express  = require('express'),
    partials = require('express-partials'),
    http     = require('http'),
    path     = require('path');

var app = express();

// all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3838);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  // Middleware
  app.use(partials());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes

// Setup like so
// app.HTTPMETHOD('path', serverCallBackFunction)

app.get('/', function(res, res) {
  res.render('index');
});

app.get('/contact', function(res, res) {
  res.render('contact');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Application listening on port ' + app.get('port'));
});
