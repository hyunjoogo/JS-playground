__onWindowLoad();

function __onWindowLoad() {
  chrome.extension.onMessage.addListener(function(request, sender) {
    if(request.action == "getSource") {
      console.log('ass');
      document.body.innerText = request.source;
    }
  });

  function onWindowLoad() {
    chrome.tabs.executeScript(null, {
      file: "getSource.js"
    }, function() {
      if(chrome.extension.lastError) {
        document.body.innerText = 'Error : \n' + chrome.extension.lastError.message;
      }
    });
  }

  window.onload = onWindowLoad;
}


function dragText() {
  console.log("mouse move"); // 로그

  let text;

  if(window.getSelection) {
    text = window.getSelection().toString();
  }
  else if (document.selection) {
    text = document.selection.createRange().text;
  }
  return text;
}

document.onmouseup = function() {
  if(dragText()) {
    console.log(dragText());
    // translateEnToJp(dragText()).then(()=>translateEnToKr(dragText()))
  }
}








