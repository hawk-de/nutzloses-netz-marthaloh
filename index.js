/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference  path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />


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
const body = document.getElementById('body');
const div = document.getElementById('div');
let indent = 0;
let background = 255;
let bgr;
let ind = indent + "vw";

let pressedkey = "";

let ewidth = 0;

let start = Date.now();
let millis = 0;
let seconds = 0;
let deletedletters = 0;
let writtenletters = 0;

let insert;
let go = 0;
let about = 0;
const abouttext = "about, about, about";

document.addEventListener('keydown', typeToDelete);
counter1.innerHTML = "0";

texteditor.addEventListener('keydown', function(event){
  event.preventDefault()
});



function draw() { 
  
  if(go === 0){
    if(seconds < 1){
      texteditor.innerHTML = "3";
    } else if(seconds < 2){
      texteditor.innerHTML = "2";
    } else if(seconds < 3){
      texteditor.innerHTML = "1";
    } else if(seconds < 4){
      texteditor.innerHTML = "0";
    } else{
      go = 1;
      start = Date.now();
    }
  }

  millis = Date.now() - start;
  seconds = Math.floor(millis / 1000);

 if(go === 1 && about < 3){
  cursor.innerHTML = "_"; 
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
 
  if(editortext.length === 0 && frameCount > 1){
    noLoop();
    document.removeEventListener('keydown', typeToDelete);
    document.addEventListener('keydown', typeToWrite);
  }

  if(letter === text.length){
    noLoop();
  }
} else if(about === 3){
  texteditor.innerHTML = abouttext;
}
}


function typeToDelete(e) {

  indent = 0; 
  ind = indent + "vw";
  div.style.setProperty("text-indent", ind);

  //console.log(e.key);

if(e.key === "?"){
  about++;
} else {
  about = 0;
}

if(letter < text.length){
  if(e.key === firstchar[0]){
    editortext.shift();
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    firstchar = editortext.slice(0,1);
    newtext = editortext.slice(1, editortext.length);
    counter1.innerHTML = showntext.length;
    correct++;
    deletedletters++;
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
      if(fails < 4){
      fails++;
      }
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
} else {
  console.log("time:", seconds, "seconds");
  console.log("deleted letters:", deletedletters);
  letter = 0;
}
}

function typeToWrite(e) {
  
  if(background <= 50){
    texteditor.style.setProperty("color", "white");
    cursor.style.setProperty("color", "white");
  }
  
  pressedkey = e.key;
  insert = e.key;

  if(e.key === "ä"){
    insert = "ääääääähh";
  }

  if(pressedkey.length === 1){
    editortext.push(insert);
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    writtenletters++;
  }

  if(e.key === "Backspace" && editortext.length > 0){
    editortext.shift();
    showntext = editortext.join('');
    texteditor.innerHTML = showntext;
    writtenletters = writtenletters-1;
  }
}