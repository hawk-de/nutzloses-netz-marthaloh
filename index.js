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
let correct = 0;
let fails = 0;
let add = 0;
let letter = 0;
let editortext = [];
let showntext;

let firstchar;
let newtext;
const texteditor = document.getElementById('texteditor');
const cursor = document.getElementById('cursor');
const counter1 = document.getElementById('counter1');
const counter2 = document.getElementById('counter2');
const counter3 = document.getElementById('counter3');
const counter4 = document.getElementById('counter4');
const body = document.getElementById('body');
const div = document.getElementById('div');
let indent = 0;
let background = 255;
let bgr;
let ind = indent + "vw";

let pressedkey = "";

let ewidth = 0;

const start = Date.now();
let millis = 0;
let seconds = 0;
let deletedletters = 0;
let writtenletters = 0;

let space = 0;

let insert;

document.addEventListener('keydown', typeToDelete);
counter1.innerHTML = "0";
counter2.innerHTML = "0";
counter3.innerHTML = "0";


function draw() {

  if(frameCount >= speed) {
    editortext.push(text[letter]);
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    letter++;
    speed += random(10,15);
    counter1.innerHTML = showntext.length;
  }

  firstchar = editortext.slice(0,1);
  newtext = editortext;
  
  millis = Date.now() - start;
  seconds = Math.floor(millis / 1000);
  counter3.innerHTML = seconds;

  if(editortext.length === 0 && frameCount > 1){
    noLoop();
    document.removeEventListener('keydown', typeToDelete);
    document.addEventListener('keydown', typeToWrite);
  }

  if(text.length === editortext.length){
    noLoop();
    document.removeEventListener('keydown', typeToDelete);
    createCanvas(100, 100);
    fill(0, 0, 0);
    for(ewidth = 0; ewidth < 100 || ewidth < 100; ewidth++){
      ellipse(100/2, 100/2, ewidth);
    }
    body.style.setProperty("background-color", "rgb(20, 20, 20)");
    ewidth = 0;
    noCanvas();
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
    counter1.innerHTML = showntext.length;
    correct++;
    deletedletters++;
    counter2.innerHTML = deletedletters;
  } else if(e.key !== "Shift"){
      correct = 0;
      add = Math.pow(2, fails);
      for(i=0; i<add; i++){
        editortext.push(text[letter]);
        showntext = editortext.join('');
        texteditor.innerHTML = showntext;
        letter++;
        counter1.innerHTML = showntext.length;
      }
      fails++;
    }

  if(correct === 15){
    for(i=0; i<2; i++){
      editortext.pop();
      showntext = editortext.join('');
      texteditor.innerHTML = showntext;
      letter = letter-1;
      counter1.innerHTML = showntext.length;
      correct = 0;
    }
  }

  if(background <= 50){
    counter1.style.setProperty("color", "white");
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
  
  pressedkey = e.key;
  insert = e.key;
  

  /*if(space > 0 && pressedkey.length === 1){
    editortext[space] = e.key;
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    writtenletters++;
    counter4.innerHTML = writtenletters;
    space = 0;
  } else*/

  if(e.key === "ä"){
    insert = "ääääääähh";
  }

  if(pressedkey.length === 1){
    editortext.push(insert);
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    writtenletters++;
    counter4.innerHTML = writtenletters;
  }

  /*if(e.code === "Space" && showntext.length > 3){
    space = random(1,showntext.length-1);
  }*/

  if(e.key === "Backspace" && editortext.length > 0){
    editortext.shift();
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    writtenletters = writtenletters-1;
    counter4.innerHTML = writtenletters;
  }

}