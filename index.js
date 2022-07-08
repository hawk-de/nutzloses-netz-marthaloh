/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference  path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />


const editortext = "Hallo! Ich bin ein nutzloser Texteditor. Hier kannst du deine Texte eintippen. Probier es aus! Finger auf die Tastatur und los geht es! Keine Scheu, schreib einfach drauf los.  Unterbrich mich ruhig. Doch sei gewarnt: Verärgere mich nicht zu sehr, sonst verweigere ich mich. Und lass mich nicht zu lange warten, ich bin sehr  ungeduldig und werde bei Langeweile schnell schludrig.";
let firstchar = editortext.slice(0,1);
let newtext = editortext;
const texteditor = document.getElementById('texteditor');
let indent = 0;
document.addEventListener('keydown', typeToDelete);



function typeToDelete(e) {
  console.log(e.key);
  console.log(newtext);
  if(e.key === firstchar[0]){
    texteditor.innerHTML = newtext;
    indent += 10; 
    let i = indent + "px";
    document.getElementById('texteditor').style.setProperty("text-indent", i);
    firstchar = newtext.slice(0,1);
    newtext = newtext.slice(1, newtext.length);
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
