var express = require('express');
var server = express();
var port = 9420;
const root_dir = "/home/coverstreet/Coding/Garden"
const data_root = root_dir + "/database";

var fs = require('fs');
var { exec } = require('child_process');
var { spawn } = require("child_process");

var Zip = require("node-zip");

function parse_fetchprogramdata_input(req) {
	var split_query = req.query.programname.split("/"); // Splitting query by slashes

	var verified_path = data_root; // Current path that is proven to exist

	// Iterate through query and see if directories/files exist
	for (var i = 0; i < split_query.length; i++) {
		if (fs.existsSync(verified_path + "/" + split_query[i])) {
			verified_path += "/" + split_query[i];
			console.log(verified_path);
		} else {
			return -1;
		}
	}

	// Retrieve files from database, zip, and return resulting zip. The main get method will send the zip back
	var filenames = [];
	fs.readdirSync(verified_path).forEach(function (file) {
		filenames.push(file);
	});

	// Creating zip object and adding files to it
	var zip = new Zip;
	for (var i = 0; i < filenames.length; i++) {
		zip.file(filenames[i], fs.readFileSync(verified_path + "/" + filenames[i]));
	}
	var options = {base64: false, compression:'DEFLATE'}; // Options for generating zip
	/*
	fs.writeFile("test1.zip", zip.generate(options), 'binary', function(error) {
		console.log(error)
	})
	*/
	return zip.generate(options);
}

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

server.get("/fetchprogramdata", function(req, res) {
	console.log(req.query.programname);
	x = parse_fetchprogramdata_input(req);
	if (x == -1) {
		res.sendStatus(404);
		return;
	}

	// Setting response
	res.set("Content-Type", "application/zip");
	res.set("Content-Disposition", "attachment; filename=jarmuzpackage.zip");
	res.set("Content-Length", x.length)
	res.end(x, 'binary');
})

server.listen(port);
console.log("Starting Jarmuz Garden server and listening on port " + port);

