#!/usr/bin/env node
'use strict';
const program = require('commander');
const exec = require('child_process').exec;
const xlsx = require('node-xlsx');
const fs = require('fs');
const Promise = require('promise');
const Converter = require("csvtojson").Converter;
const converter = new Converter({});
const glob = require("glob");
const gettextParser = require("gettext-parser");

let excelToPo = (input, output) => {
	//console.log('translations.csv sucessfully converted to en_EN.mo, pt_PT.mo');
	let execCallback = (error, stdout, stderr) => {
	    if (error) console.log("exec error: " + error);
	    if (stdout) console.log(stdout);
	    if (stderr) console.log("shell error: " + stderr);
	};

	let csvToPo = (input) => {
		converter.fromFile("./"+input,function(err,result){
 			console.log(result);
 			for (var i = 0, len = result.length; i < len; i++) {
			  	console.log(result[i]['language']);
			}
		});
	}

	let parseToPo = (input, output) => {
		var obj = xlsx.parse(__dirname + '/'+input); // parses a file
		var rows = [];
		var cells = [];
		var strings = {};
		var writeStr = "";

		//looping through all sheets
		for(var i = 0; i < obj.length; i++)
		{
		    var sheet = obj[i];
		    //loop through all rows in the sheet
		    for(var j = 1; j < sheet['data'].length; j++)
		    {
	        	if(!strings[sheet['data'][j][0]]){
	        		strings[sheet['data'][j][0]] = [];
	        	} 
	        	strings[sheet['data'][j][0]].push({ key : sheet['data'][j][1], string: sheet['data'][j][2] });	
		            
		    }
		}

		var keys = Object.getOwnPropertyNames(strings).sort();	
		for(var x = 0; x < keys.length; x++){
			var output = '';
			fs.writeFile(keys[x]+'.po', '', function (err) {

			});
			for(var y = 0; y < strings[keys[x]].length; y++){
				output += 'msgid "'  + strings[keys[x]][y]['key']+ '"' + "\n";
				output += 'msgstr "' + strings[keys[x]][y]['string'] + '"' + "\n";
			}
			fs.appendFile(keys[x]+'.po', output, function (err) {

			});
		}
	}

	let compileToMo = (dir) => {
		var options = [];
		glob("*.po", options, function (er, files) {
		  	// files is an array of filenames.
		  	// If the `nonull` option is set, and nothing
		  	// was found, then files is ["**/*.js"]
		  	// er is an error object or null.
		  	for(var f = 0; f < files.length; f++){
		  		console.log(files[f]);
		  	}
	  	});
	}

	return new Promise(function(fulfill, reject){
		parseToPo(input, output);
		//compileToMo('/mo');
		exec('for file in `find . -name "*.po"` ; do msgfmt -o ${file/.po/.mo} $file ; done', execCallback);
	});
}

program
	.version('1.0.3')
  	.command('convert [input]')
  	.description('Convert excel to mo')
  	.action(excelToPo);
	program.parse(process.argv);