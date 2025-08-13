const grabBtn1 = document.getElementById("grabBtn1");
if (grabBtn1){
grabBtn1.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptFile(tab);
        } else {
            alert("не нашел вкладку")
        }
    })
})
}
function execScriptFile(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:giveFile
        },
        onResultFile
    )
}

function giveFile(){
	//ПРОВЕРКА НА ЛОГИН
	var btnLog = document.querySelector(".login-btn");
    if(btnLog){alert("НУЖНО ЗАЛОГИНИТЬСЯ!!! НЕ ОТПРАВЛЯЙ!!!");};
	
	
}

function onResultFile(res){
	
}