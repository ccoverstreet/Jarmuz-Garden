var express = require('express');
var server = express();
var port = 9420;
const root_directory = "/home/coverst2"

var fs = require('fs');
var { exec } = require('child_process');
var { spawn } = require("child_process");


// Adding middleware
//kserver.use(express.static(root_directory));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get("/", function(req, res) {
	res.send("Jarmuz Garden");
})

server.get("/hello_world", function(req, res) {
	res.send("Hello from Jarmuz Garden");
})


server.listen(port);
console.log("Starting Jarmuz Garden server and listening on port " + port);

