const grabBtn6 = document.getElementById("grabBtn6");
var page1PERSONAL = "http://localhost:8080/loyalty/contracts/";



if (grabBtn6){
grabBtn6.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptPERSONAL(tab);
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScriptPERSONAL(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:takePERSONAL
        },
        onResultPERSONAL
    )
}

function takePERSONAL() {  
  	//получение грн
    const link = document.querySelector('a[href^="/pp/contracts/"]');
	let string1 = '';

	if (link) {
		// Извлекаем число из конца URL
		string1 = link.getAttribute('href').split('/').pop();
		// "158485"
		
	}
	
	setTimeout(() => {
    window.open("http://localhost:8080/api/doc/templates/contracts/"+string1+"/user_personification_PP?file_name=Согласие на обработку перс.данных", '_blank');
	}, 500);
	
      return string1;
}

function onResultPERSONAL(var111) {  
    if (!var111 || !var111.length) { 
        alert("Не нашел ЛС");
        return;
    }
    const res1 = var111.map(var111=>var111.result)
    openPagePERSONAL(res1);
}


function openPagePERSONAL(ls) {
}

function execScriptPERSONAL2(tab) {    
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:catchPERSONAL
        },
        onResultPERSONAL2
    )
}

function catchPERSONAL(){
    chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        fillFormPERSONAL(message);               
        sendResponse("OK");
    });
}

function fillFormPERSONAL(grn1){
}

function onResultPERSONAL2(){
    //alert("done");
}