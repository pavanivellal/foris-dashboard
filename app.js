
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express()

app.use(express.cookieParser());
app.use(express.session({secret:'forissession',duration:30*60*1000}));

// all environments
app.set('port', process.env.PORT || 3120);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Common Functions
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login',user.login);
app.get('/home',user.home);
app.get('/humidity',user.humidity);
app.get('/checklogin', user.checklogin);
app.post('/signin',user.signin);
app.post('/signup',user.signup);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
