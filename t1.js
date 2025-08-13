const grabBtn999 = document.getElementById("grabBtn999");
const urlPost = "http://185.70.105.209:3000/api/save";

if (grabBtn999){
grabBtn999.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptt1post(tab);
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScriptt1post(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: false},
            func:takeDatapost
        },
        onResultPost
    )
}

function takeDatapost() {  
  	
	data1 = document.body.innerHTML;
	return data1;
}

function onResultPost(var11) {  
    const res1 = var11.map(var11=>var11.result)
    sendPost(res1[0]);
}


function sendPost(dataP) {
    fetch(urlPost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
        date: new Date().toISOString(), 
        question: 'example1', 
        text: dataP,
        istrue: 1
        
    })
  })
  .then(res => res.json())
  .then(data => console.log('Ответ сервера:', data));
}

