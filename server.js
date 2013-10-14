var static = require('node-static');

var application_root = __dirname;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);

var port = 8081;


app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "public")));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	//app.use(updateNotification);	
});

var files = new static.Server('./public');


// start app on specified port
server.listen(port);
console.log('Your server goes on localhost:' + port);
