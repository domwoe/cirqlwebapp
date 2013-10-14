var static = require('node-static');
//var app = http.createServer(handler);
var application_root = __dirname;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
var port = 8080;
//var log = require('./logfile.js');
//var sys = require('sys')
//var spawn = require('child_process').spawn;

//var logUpdate = spawn("tail", ["-f","/home/node/.forever/ELwL.log"]);




//var database = require('./routes/database');

// config


app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "public")));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	//app.use(updateNotification);	
});

var files = new static.Server('./public');

// var mysql_data = require('./mysql-data.js');
// var mongo_data = require('./mongo-data.js');

// mongo_data.getSetpoints(1, function(item) {
// 	console.log(item);
// });
// function handler(request, response) {
// 	request.addListener('end', function() {
// 		files.serve(request, response);
// 	});
// }

// var mqtt = require('mqttjs');
// const KEEPALIVE = 10000; //MQTT Keepalive time

// //MQTT server settings

// var mqttPort = 1883,
// 	mqttHost = '87.106.37.243';
  
// //Create MQTT client

// var mqttClient = mqtt.createClient(mqttPort, mqttHost, function(err, client) {
// 	if (err) {
// 		console.dir(err);

// 	}
//   client.connect({keepalive: KEEPALIVE});
 
//   // Subscribe on connection 
 
//   client.on('connack', function(packet) {
// 	  if (packet.returnCode === 0) {
//               // Add subscriptions here
	
// 	      client.subscribe({topic: '+/#'});
//           } else {
// 		  console.log('connack error %d', packet.returnCode);
          
// 	  }
//   });

//   // Reconnect after disconnect (MQTT)
 
//   client.on('disconnect', function() {
// 	  client.connect({keepalive: KEEPALIVE})
//   });
  
//   client.on('error', function(e) {
// 	  console.log('error %s', e);
// 	  client.connect({keepalive: KEEPALIVE})
//   });

  
// });  

// // delete to see more logs from sockets
// io.set('log level', 1);

// io.sockets.on('connection', function (socket) {

// 	//mqttClient.publish({qos: 1, topic: 'bla/bla', payload: 'test'})

// 	//var log = spawn("tail", ["-10","/home/node/.forever/5dUP.log"]);

// 	//log.stdout.on('data', function (data) {
// 	//	socket.emit('update_log', data.toString());
// 	//})
 	
//  	//logUpdate.stdout.on("data", function (data) {
//  	//	//console.log(data.toString());
// 	//	socket.emit('update_log', data.toString());
// 	//}); 
// 	mqttClient.on('publish', function(packet) {
// 		console.log('MQTT message received with topic: '+packet.topic+' and payload: '+packet.payload);
// 		socket.emit('update_mqtt', 'MQTT message received with topic: '+packet.topic+'</br> and payload: '+packet.payload+'</br>');
//  	}); 
// });

//  io.sockets.on('disconnect', function () { 
//  	 process.kill(log);
//  });	

// app.post('/api/analytics', function (req, res) {
// 	//connection.connect();
	
// 	var id = req.body.heatjackId+'';
// 	var quantity = req.body.quantitiy;
// 	var beginTime = req.body.beginTime;
// 	var endTime = req.body.endTime;

// 	if (quantity == 'manRoomSetPoint') {
// 		mysql_data.getData(id,quantity,'icom',beginTime,endTime,function(err, data){
// 			if (err) console.log(err);
// 			res.send(data);
// 		});
// 	}
// 	else if (quantity == 'mode') {
// 		console.log('getting Mode');
// 		mongo_data.getMode(id,beginTime,endTime,function(err, data){
// 			if (err) console.log(err);
// 			res.send(data);
// 			console.log('got data');
// 		})
// 	}
// 	else {
// 		mysql_data.getData(id,quantity,'temp',beginTime,endTime,function(err, data){
// 			if (err) console.log(err);
// 			res.send(data);
// 		});
// 	}
// });

  
 


// start app on specified port
server.listen(port);
console.log('Your server goes on localhost:' + port);
