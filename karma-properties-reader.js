var readFile = function (url) {
  url = readFile.base + url;
  
  var xhr = new XMLHttpRequest();
  var text = null;
  
  xhr.open("GET", url, false);
  
  xhr.onload = function (e) {
    if (xhr.status === 200) {
      text = xhr.responseText;
    }
    
    else {
      console.error('readFile', url, xhr.statusText);
    }
  };
  
  xhr.onerror = function (e) {
    console.error('readFile', url, xhr.statusText);
  };
  
  xhr.send(null);

  return text;
};

readFile.base = '/base/';

var readProperties = function(url) {
  var properties = {};

  var text = readFile(url);

  var lines = text.split('\n');

  var i = lines.length;
  while(i--) {
    var line = lines[i];

    if(!line) {
      continue;
    }

    var pair = line.split('=');

    var key = pair[0];
    var value = pair[1];

    var keyParts = key.split('.');

    var pointer = properties;
    for(var j = 0; j < keyParts.length; j++) {
      var name = keyParts[j];

      if(i === keyParts.length - 1) {
        pointer[name] = value;
      } else {
        pointer[name] = {};
      }

      pointer = pointer[name];
    }
  }

  return properties;
}

try {
  if (exports) {
    exports.readFile = readFile;
    exports.readProperties = readProperties;
  }
}

catch (error) {
  //exports not available so not loaded by require
}
