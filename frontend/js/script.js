const HOTSPOT = 0;
const J9VANILLA = 1;
const J9COLDRUN = 2;
const J9WARMRUN = 3;

var limit = 30;
var className = "Sample";

var editor = ace.edit("editor");
var javaMode = ace.require("ace/mode/java").Mode;
editor.session.setMode(new javaMode());

editor.commands.on("exec", function(e) { 
    var rowCol = editor.selection.getCursor();
    if ((rowCol.row === 0) || ((rowCol.row + 1) === editor.session.getLength())) {
        e.preventDefault();
        e.stopPropagation();
    }
});


document.getElementById("runJavaProgram").addEventListener('click', function(){
    var program = editor.getValue();

    api.compileJavaProgram(className, program, function(err, res){
        $('.ui.modal').modal('show');
        api.clearRequests(runTest, className);
    });
});

document.getElementById("showGraph").addEventListener('click', function() {
    $('.ui.modal').modal('show');
});

document.getElementById("Sample").addEventListener('click', function(){
    var sample = `class Sample {
    public static void main(String args[]) {
        //Enter your code here
    }
}`
    editor.setValue(sample);
    editor.clearSelection();
    className = "Sample";
});

document.getElementById("BinarySearch").addEventListener('click', function(){
    api.getProgram("BinarySearch", function(err, result){
        editor.setValue(result["program"]);
        editor.clearSelection();
    });
    className = "BinarySearch";
});

document.getElementById("Fibonacci").addEventListener('click', function(){
    api.getProgram("Fibonacci", function(err, result){
        editor.setValue(result["program"]);
        editor.clearSelection();
    });
    className = "Fibonacci";
});

document.getElementById("HelloWorld").addEventListener('click', function(){
    api.getProgram("HelloWorld", function(err, result){
        editor.setValue(result["program"]);
        editor.clearSelection();
    });
    className = "HelloWorld";
});

document.getElementById("InsertionSort").addEventListener('click', function(){
    api.getProgram("InsertionSort", function(err, result){
        editor.setValue(result["program"]);
        editor.clearSelection();
    });
    className = "InsertionSort";
});

document.getElementById("PrimeNumbers").addEventListener('click', function(){
    api.getProgram("PrimeNumbers", function(err, result){
        editor.setValue(result["program"]);
        editor.clearSelection();
    });
    className = "PrimeNumbers";
});

document.getElementById("PrintDiamond").addEventListener('click', function(){
    api.getProgram("PrintDiamond", function(err, result){
        editor.setValue(result["program"]);
        editor.clearSelection();
    });
    className = "PrintDiamond";
});

document.getElementById("Summation").addEventListener('click', function(){
    api.getProgram("Summation", function(err, result){
        editor.setValue(result["program"]);
        editor.clearSelection();
    });
    className = "Summation";
});

function runTest(className){

    
    config.data.datasets[0].data = [0];
    config.data.datasets[1].data = [0];
    config.data.datasets[2].data = [0];
    config.data.labels = [0];

    api.clearCache(function(err, result) {
        console.log(err);
        runPrograms(className, 0);
    });
     
    
 }

function runPrograms(className, counter) {
    if (counter >= limit) {
        return;
    }
    if (counter == 0) {
        callback = api.coldRun
    } else {
        callback = api.runJavaTest
    }
    callback(className, HOTSPOT, function(err, result){
        callback(className, J9VANILLA, function(err, result2){
            callback(className, J9WARMRUN, function(err, result3){
                var execNum = config.data.labels.length;
                config.data.labels.push(execNum);
                config.data.datasets[0].data.push(result["time"]);
                config.data.datasets[1].data.push(result2["time"]);
                config.data.datasets[2].data.push(result3["time"]);
                window.myLine.update();
                if (counter == 0) {
                    document.getElementById("console").innerHTML = "<pre>"+result["output"]+"</pre>";
                }
                runPrograms(className, counter + 1);
            });
        });
    });
}

