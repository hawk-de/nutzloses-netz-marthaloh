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
let i = 0;
let nextletter = false;
let editortext = [];
let showntext;
let timecount;

let firstchar;
let newtext;
const texteditor = document.getElementById('texteditor');
let indent = 0;
let background = 255;
let bgr;
let ind;

document.addEventListener('keydown', typeToDelete);
//document.addEventListener('DOMContentLoaded', runningText);


function draw() {
  timecount = frameCount/20;
  
  if(timecount === i+1) {
    nextletter = true;
  }

  if(nextletter === true) {
    editortext.push(text[i]);
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    i++;
    nextletter = false;
    //console.log(editortext);
  }

  firstchar = editortext.slice(0,1);
  newtext = editortext;

  if(editortext.length === 0 && timecount > 1){
    noLoop();
    document.removeEventListener('keydown', typeToDelete);
    document.addEventListener('keydown', typeToWrite);
  }
}


function typeToDelete(e) {
  indent = 0; 
  ind = indent + "vw";
  document.getElementById('texteditor').style.setProperty("text-indent", i);

  console.log(e.key);

  if(e.key === firstchar[0]){
    editortext.shift();
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    firstchar = editortext.slice(0,1);
    newtext = editortext.slice(1, editortext.length);
  } else if(background > 50 && e.key !== "Shift"){
    background = background - 25;
    bgr = "rgb(" + background + "," + background + "," + background + ")";
    document.getElementById('body').style.setProperty("background-color", bgr);
  }

  if(firstchar[0] === " "){
    indent = 1.2; 
    let i = indent + "vw";
    document.getElementById('texteditor').style.setProperty("text-indent", i);
  }
}

function typeToWrite(e) {
  if(e.key === "Shift"){
    document.getElementById('texteditor').style.setProperty("color", "blue");
  } else if(e.key === "Alt"){
    document.getElementById('texteditor').style.setProperty("color", "red");
  } else if(e.key === "Control"){
    document.getElementById('texteditor').style.setProperty("color", "green");
  } else{
    editortext.push(e.key);
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
  }
}



//function fetchSource(){
  // source_input.value = "kernel";
  //fetch("./kernel.txt").then(a=>a.text()).then(a=>{index=0,typer.innerHTML="",setStore("source",a),source=a})}

//function toggleCursor(){
  //cursor.style.color="transparent"===cursor.style.color?"inherit":"transparent"
//}

//function bindEvents(){
  //setInterval(toggleCursor,500);
//}

//function typeToDelete(){
  //editortext = document.getElementById("texteditor");
  //textslice = editortext.slice(0,1);
  //console.log(textslice);
//}

//function setup() {
  //bindEvents;
  //document.getElementById("texteditor").addEventListener("keydown", typeToDelete);
//}

//function draw() {
  //typeToDelete;
//}
