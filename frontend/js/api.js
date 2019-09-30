var api = (function(){
    var module = {};

    var requests = [];

    function send(method, url, data, callback, sync){
        var xhr = new XMLHttpRequest();
        requests.push(xhr);
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));

        };
        xhr.open(method, url, sync);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    module.clearRequests = function(callback, className){
        requests.forEach(function(xhr){
          xhr.abort();
        });
        requests = [];
        callback(className);
    }

    module.getProgram = function(programName, callback){
        send("GET", "api/program/"+programName, null, callback, true);
    };

    module.runJavaTest = function(programName, type, callback){
        send("POST", "/api/runJavaTest/", {programName:programName, type:type}, callback, true);    
    };

    module.compileJavaProgram = function(filename, program, callback){
        send("POST", "api/compileJavaProgram/", {filename:filename, program:program}, callback, true);
    };

    module.clearCache = function(callback) {
        send("POST", "api/clearCache/", null, callback, true);
    }

    module.coldRun = function(programName, type, callback) {
        send("POST", "api/coldRun/", {programName:programName, type:type}, callback, true);
    }



    return module;
})();