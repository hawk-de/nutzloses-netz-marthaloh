/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference  path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />


//function preload() {
  //let text1 = loadStrings('text1.txt');
  //let text2 = loadStrings('text2.txt')
//}


const text1 = "Hallo! Ich bin ein nutzloser Texteditor. Hier kannst du deine Texte eintippen. Probier es aus! Finger auf die Tastatur und los geht es! Keine Scheu, schreib einfach drauf los.  Unterbrich mich ruhig. Doch sei gewarnt: Verärgere mich nicht zu sehr, sonst verweigere ich mich. Und lass mich nicht zu lange warten, ich bin sehr  ungeduldig und werde bei Langeweile schnell schludrig.";
const text = text1.slice();
let speed = 1;
let letter = 0;
let editortext = [];
let showntext;

let firstchar;
let newtext;
const texteditor = document.getElementById('texteditor');
const cursor = document.getElementById('cursor');
const counter = document.getElementById('counter');
const body = document.getElementById('body');
const div = document.getElementById('div');
let deletedletters = 0;
let indent = 0;
let background = 255;
let bgr;
let ind = indent + "vw";

document.addEventListener('keydown', typeToDelete);
//document.addEventListener('DOMContentLoaded', runningText);
counter.innerHTML = deletedletters;

function draw() {

  if(frameCount >= speed) {
    editortext.push(text[letter]);
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    letter++;
    speed += random(1,15);
  }

  firstchar = editortext.slice(0,1);
  newtext = editortext;

  if(editortext.length === 0 && frameCount > 1){
    noLoop();
    document.removeEventListener('keydown', typeToDelete);
    document.addEventListener('keydown', typeToWrite);
  }
}


function typeToDelete(e) {
  indent = 0; 
  ind = indent + "vw";
  div.style.setProperty("text-indent", ind);

  console.log(e.key);

  if(e.key === firstchar[0]){
    editortext.shift();
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    firstchar = editortext.slice(0,1);
    newtext = editortext.slice(1, editortext.length);
    deletedletters++;
    counter.innerHTML = deletedletters;
  } else if(background > 50 && e.key !== "Shift"){
    background = background - 25;
    bgr = "rgb(" + background + "," + background + "," + background + ")";
    body.style.setProperty("background-color", bgr);
  }

  if(background <= 50){
    counter.style.setProperty("color", "white");
  }

  if(firstchar[0] === " "){
    indent = 1.2; 
    ind = indent + "vw";
    div.style.setProperty("text-indent", ind);
  }
}

function typeToWrite(e) {
  if(background <= 50){
    texteditor.style.setProperty("color", "white");
    cursor.style.setProperty("color", "white");
  }
  
  if(e.key === "Shift"){
    texteditor.style.setProperty("color", "blue");
  } else if(e.key === "Alt"){
    texteditor.style.setProperty("color", "red");
  } else if(e.key === "Control"){
    texteditor.style.setProperty("color", "green");
  } else if(e.key === "Backspace"){
    editortext.shift();
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
  } else{
    editortext.push(e.key);
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
  }
}