const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const spawn = require("child_process").spawn;
const exec = require("child_process").exec;
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());       
app.use(express.static('frontend'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

app.get('/api/program/:programName', function(req, res, next){
    var programName = req.params.programName;
    var fs = require('fs');

    fs.readFile("./PresetPrograms/"+programName+".java", 'utf8', function(err, program){
        return res.json({program:program});
    });
});

app.post('/api/runJavaTest/', function (req, res, next) {
    var programName = req.body["programName"];
    var type = req.body["type"];
    var output = "";
    var error = "";
    var sum = 0;
  
    var java = spawn('bash', ["runProgram.sh", parseInt(type), programName]);

    java.stdout.on('data', function(data){
        
        output += data;
    });

    java.stderr.on('data', function(data){
        sum+=parseFloat(""+data);
        error += data + "\n"
    });

    java.on('close', function(code){
        var time;
        if (type == 2) {
            time = sum*1000;
        } else {
            time = (sum/5)*1000;
        }
        time = Math.round(time*100)/100;
        console.log("JAVA: Process exited with code "+ code +" and executed in " + time + " milliseconds");
        return res.json({code:code, time:time, output:output});
    });

});

app.post('/api/compileJavaProgram', function (req, res, next){
    var filename = req.body["filename"];
    fs.writeFile(filename+".java", req.body['program'], function (err) {
        if (err) throw err;
        console.log('Program has been saved');
        var javac = spawn("javac", [filename + ".java"]);

        javac.stdout.on('data', function(data){
            console.log("stdout: " + data);
        });

        javac.stderr.on('data', function(data){
            console.log("stderr: " + data);
        });

        javac.on('close', function(code){
            console.log("JAVAC: Process exited with code "+ code);
            return res.json({code:code});
        });
      });
});

app.post('/api/clearCache', function (req, res, next){
    var cache = exec("rm -f testCache");
    cache.on('close', function(code) {
        var cache2 = exec("javaj9 -Xshareclasses:destroyAll");
        cache2.on('close', function(code) {
            return res.json({});
        });
    });
});

app.post('/api/coldRun', function (req, res, next){
    var programName = req.body["programName"];
    var type = req.body["type"];
    var output = "";
    var error = ""; 
    var sum = 0;
  
    var java = spawn('bash', ["coldRun.sh", parseInt(type), programName]);

    java.stdout.on('data', function(data){        
        output += data;
    });

    java.stderr.on('data', function(data){
        sum+=parseFloat(""+data);
        error += data + "\n"
    });

    java.on('close', function(code){
        var time = sum*1000;
        time = Math.round(time*100)/100;
        console.log("JAVA: Process exited with code "+ code +" and executed in " + time + " milliseconds");
        return res.json({code:code, time:time, output:output});
    });
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

