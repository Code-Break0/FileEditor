var editor, mode, dir, doc, saved;
var keys = {};

function load() {
  editor = ace.edit("editor");
  openFolder("C:/wamp64/www/Code Break/File Editor");
  window.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
    if(event.ctrlKey && keys[83]) {
      event.preventDefault();
      save();
    }
  });
  window.addEventListener("keyup", function(event) {delete keys[event.keyCode];});
  document.getElementById("editor").addEventListener("keyup", checkSave);
}
function post(url,data,callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };
  xhr.open("POST", 'php/' + url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  if(typeof data === "object") {
    var newObj = "";
    for(var i in data) {
      newObj += i + '=' + data[i];
      if(Object.keys(data).indexOf(i) !== Object.keys(data).length-1) {
        newObj += "&";
      }
    }
    data = newObj;
  }
  xhr.send(encodeURI(data));
}

function openFolder(folder) {
  post("dir.php", {folder:folder}, function(data) {
    dir = folder;
    document.getElementById('files').innerHTML = data;
  });
}
function openFile(file) {
  post("file.php", {file:file}, function(data) {
    doc = file;
    saved = data;
    document.getElementById("file").textContent = doc.split('/').pop();
    editor.setValue(data, -1);
    setMode();
  });
}
function save() {
  if(doc === undefined) {return false;}
  post("save.php", {file:doc,code: editor.getValue()}, function(data) {
    if(data === 'true') {
      saved = editor.getValue();
      checkSave();
    }
    else {
      console.log(data);
    }
  });
}
function setMode() {
  var modelist = ace.require("ace/ext/modelist");
  mode = modelist.getModeForPath(doc).mode;
  editor.session.setMode(mode);
}
function checkSave() {
  if(editor.getValue() !== saved && saved !== undefined) {
    document.getElementById("save").style.display = "block";
  }
  else {
    document.getElementById("save").style.display = "none";
  }
}
