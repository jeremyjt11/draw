function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas); 
    //Code to call the classifyCanvas function when the mouse is released from the canvas.
    synth = window.SpeechSynthesis;
    //Initialized the Web Speech API which is the window.speechSynthesis and store it in a variable synth.//
}

function clearCanvas() {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    // set stroke Weight to 13
    strokeWeight(13);
    // if mouse is pressed, draw line between previous and current mouse positions
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
var utterThis;
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label:' + results[0].label;
    document.getElementById('confidence').innerHTML = 'confidence' + Math.round(results[0].confidence * 100) + '%';

    utterThis - new SpeechSynthesisUtterance(results[0].label);
 synth.speak(utterThis);
}