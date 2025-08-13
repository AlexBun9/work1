const grabBtn4 = document.getElementById("grabBtn4");
const page1GRN = "https://b24.avtodor-tr.ru/forms/fos/";

if (grabBtn4){
grabBtn4.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptGRN(tab);
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScriptGRN(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:takeGRN
        },
        onResultGRN
    )
}

function takeGRN() {  
  	//получение грн
      var var1 = document.querySelector('[name="tskad_violations_form[grnz]"]');
	
      var string1 = "не нашел ГРН";
      if(var1){string1 = var1.value};
      
  
      return string1;
}

function onResultGRN(var111) {  
    if (!var111 || !var111.length) { 
        alert("Не нашел ЛС");
        return;
    }
    const res1 = var111.map(var111=>var111.result)
    openPageGRN(res1);
}


function openPageGRN(ls) {
    chrome.tabs.create({url: page1GRN, active: false},(tab) => {  
		let checkInterval = setInterval(() => {
			chrome.tabs.get(tab.id, (updatedTab) => {
				if (updatedTab.status === "complete") {
					clearInterval(checkInterval);
					console.log("Страница загружена:", updatedTab.url);
					// Здесь можно выполнить действия с загруженной страницей					
					execScriptGRN2(tab);       
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

function execScriptGRN2(tab) {    
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:catchGRN
        },
        onResultGRN2
    )
}

function catchGRN(){
    chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        fillFormGRN(message);               
        sendResponse("OK");
    });
}

function fillFormGRN(grn1){
    var doc1 = document;
    var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;
	var form1 = iFrm.querySelector("form");
    var btn1 = Array.from(iFrm.getElementsByClassName("b24-form-btn"));
    var numLs = Array.from(iFrm.getElementsByClassName("b24-form-control"));    
    var check1 = iFrm.querySelector('[value="9736"]');
    var check2 = iFrm.querySelector('[value="9732"]');
	var done = Array.from(iFrm.getElementsByClassName("b24-form-state b24-form-success"));
	var test = iFrm.querySelector("b24-form-header-title");
    
    //заполнение формы--------------------------------------------------
    check1.parentNode.click();  
     
    numLs[4].value = grn1;
    numLs[4].dispatchEvent(new Event("input", { bubbles: true })); //событие смены инпута
    
    numLs[8].click();
    
    numLs[12].dispatchEvent(new Event("click", { bubbles: true })); //событие клик по списку
    
    setTimeout(() => {
    var numLs2 = Array.from(iFrm.getElementsByClassName("b24-form-control-list-selector-item"));
    numLs2[13].click();
    }, 500);
    
    setTimeout(() => {
    numLs[54].dispatchEvent(new Event("click", { bubbles: true })); //событие клик по списку
    }, 500);
    
    setTimeout(() => {
    var numLs3 = Array.from(iFrm.getElementsByClassName("b24-form-control-list-selector-item-title"));
    numLs3[1].click();
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

function onResultGRN2(){
    //alert("done");
}