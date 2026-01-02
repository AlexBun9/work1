const grabBtn5 = document.getElementById("grabBtn5");
var page1PL = "http://localhost:8080/loyalty/contracts/";



if (grabBtn5){
grabBtn5.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptPL(tab);
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScriptPL(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:takePL
        },
        onResultPL
    )
}

function takePL() {  
  	//получение грн
    const link = document.querySelector('a[href^="/pp/contracts/"]');
	let string1 = '';

	if (link) {
		// Извлекаем число из конца URL
		string1 = link.getAttribute('href').split('/').pop();
		// "158485"
		
	}
	
	setTimeout(() => {
    window.open(page1PL+string1, '_blank');
	}, 100);
	
      return string1;
}

function onResultPL(var111) {  
    if (!var111 || !var111.length) { 
        alert("Не нашел ЛС");
        return;
    }
    const res1 = var111.map(var111=>var111.result)
    openPagePL(res1);
}


function openPagePL(ls) {
}

function execScriptPL2(tab) {    
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:catchPL
        },
        onResultPL2
    )
}

function catchPL(){
    chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        fillFormPL(message);               
        sendResponse("OK");
    });
}

function fillFormPL(grn1){
}

function onResultPL2(){
    //alert("done");
}