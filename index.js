var path = require('path'),
    http = require('http'),
    config = require('config'),
    compression = require('compression'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    flash = require('connect-flash'),
    routes = require('./app/routes/routes'),
    helper = require('./app/helper'),
    cookieSession = require('cookie-session');


var app = module.exports = express();

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}


// ExpressJS Configuration
app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressValidator());
app.use(bodyParser.json({limit:'100mb'}));
app.use(cookieParser());
app.use(methodOverride());
app.use(compression());
app.use(flash());

if(process.env.NODE_ENV == 'developement') {
    app.use(express.static(path.join(__dirname, 'public')));
} else {
    app.use(express.static(path.join(__dirname, 'public'), {
        maxAge: '7d'
    }));
}

app.use('/', routes);


/**
 * Server connection..
 */
var server = http.createServer(app);

server.listen(process.env.PORT || 4000, function() {
	console.log("Express server listening on port 4000");
});