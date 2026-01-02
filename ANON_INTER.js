const grabBtn21 = document.getElementById("grabBtn21");
const page1ANON_INTER = "https://b24.avtodor-tr.ru/forms/fos/";

if (grabBtn21){
grabBtn21.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptANON_INTER(tab);
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScriptANON_INTER(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:takeANON_INTER
        },
        onResultANON_INTER
    )
}

function takeANON_INTER() {  
  	
	
      
      string1 = "";
  
      return string1;
}

function onResultANON_INTER(var111) {  
    if (!var111 || !var111.length) { 
        alert("Не нашел ЛС");
        return;
    }
    const res1 = var111.map(var111=>var111.result)
    openPageANON_INTER(res1);
}


function openPageANON_INTER(ls) {
    chrome.tabs.create({url: page1ANON_INTER, active: false},(tab) => {  
		let checkInterval = setInterval(() => {
			chrome.tabs.get(tab.id, (updatedTab) => {
				if (updatedTab.status === "complete") {
					clearInterval(checkInterval);
					console.log("Страница загружена:", updatedTab.url);
					// Здесь можно выполнить действия с загруженной страницей					
					execScriptANON_INTER2(tab);       
					setTimeout(()=>{            
						chrome.tabs.sendMessage(tab.id, ls, (resp) => {
							// сделать вкладку активной                                 
							chrome.tabs.update(tab.id, {active: true});  
						})         
					},500);
					
				}
			});
		}, 500);

	
        
          
    });
}

function execScriptANON_INTER2(tab) {    
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:catchANON_INTER
        },
        onResultANON_INTER2
    )
}

function catchANON_INTER(){
    chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        fillFormANON_INTER(message);               
        sendResponse("OK");
    });
}

function fillFormANON_INTER(grn1){
    var doc1 = document;
    var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;
	var form1 = iFrm.querySelector("form");
    var btn1 = Array.from(iFrm.getElementsByClassName("b24-form-btn"));
    var numLs = Array.from(iFrm.getElementsByClassName("b24-form-control"));    
    var check1 = iFrm.querySelector('[value="9737"]');
    var check2 = iFrm.querySelector('[value="9732"]');
	var check3 = iFrm.querySelector('[value="7489"]');
	var done = Array.from(iFrm.getElementsByClassName("b24-form-state b24-form-success"));
	var test = iFrm.querySelector("b24-form-header-title");
    
    //заполнение формы--------------------------------------------------
    check1.parentNode.click();  
    check3.parentNode.click(); 
    
    //numLs[4].dispatchEvent(new Event("input", { bubbles: true })); //событие смены инпута
    
    //numLs[8].click();
    
    numLs[13].dispatchEvent(new Event("click", { bubbles: true })); //событие клик по списку
    
    setTimeout(() => {
    var numLs2 = Array.from(iFrm.getElementsByClassName("b24-form-control-list-selector-item"));
    let target = numLs2.find(el => el.innerText.trim() === "Интероперабельность");
	target.click();
    //numLs2[14].click();
    }, 500);
    
    setTimeout(() => {
    numLs[74].dispatchEvent(new Event("click", { bubbles: true })); //событие клик по списку
    }, 500);
    
    setTimeout(() => {	
    var numLs3 = Array.from(iFrm.getElementsByClassName("b24-form-control-list-selector-item-title"));
    let target = numLs3.find(el => el.innerText.trim() === "Вопросы по транспондерам сторонних эмитентов");
	target.click();
    //numLs3[1].click();
    }, 1000);
	
    setTimeout(() => {
    check2.click();
	}, 500);
	
   //ПРОВЕРКА НА ЛОГИН
   setTimeout(() => {
	var btnLog = doc1.querySelector(".log-popup-wrap ");
    if(btnLog){alert("НУЖНО ЗАЛОГИНИТЬСЯ!!! НЕ ОТПРАВЛЯЙ!!!");};
    }, 1200);
	//кнопка отправить	
	//setTimeout(() => {btn1[0].click();}, 2000);	
	
	
    //показать номера инпутов
    /*
    numLs.forEach(function(item,ind){
            item.value = ind;
    });
     */
}

function onResultANON_INTER2(){
    //alert("done");
}