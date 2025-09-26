const grabBtn2 = document.getElementById("grabBtn2");
const page1 = "https://b24.avtodor-tr.ru/forms/fos/";

if (grabBtn2){
grabBtn2.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScript(tab);
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScript(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:takeLS
        },
        onResult
    )
}

function takeLS() {  
  	//получение ЛС
	var var1 = document.getElementsByClassName("col-mt-5");
	var var2 = document.getElementsByClassName("mb-5");
	var var3 = document.getElementsByClassName("mb-1");
	var string1 = "не нашел ЛС";
	if(var1.length != 0){
		string1 = var1[0].textContent.replace("Клиент № ", '');
		string1 = string1.replace(" договор KT001",'');
    		//alert(string1);
    		
	}
	if(var2.length != 0){
		string1 = var2[0].textContent.replace("Клиент № ", '');
		string1 = string1.replace(" договор KT001",'');
	}
	if(var3.length != 0){
		string1 = var3[0].textContent.replace("Клиент № ", '');
		string1 = string1.replace(" договор KT001",'');
	}

	return string1;
}

function onResult(var11) {  
    if (!var11 || !var11.length) { 
        alert("Не нашел ЛС");
        return;
    }
    const res1 = var11.map(var11=>var11.result)
    openPage(res1);
}


function openPage(ls) {
    chrome.tabs.create({url: page1, active: false},(tab) => {  
		let checkInterval = setInterval(() => {
			chrome.tabs.get(tab.id, (updatedTab) => {
				if (updatedTab.status === "complete") {
					clearInterval(checkInterval);
					console.log("Страница загружена:", updatedTab.url);
					// Здесь можно выполнить действия с загруженной страницей					
					execScript2(tab);       
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

function execScript2(tab) {    
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:catchLS
        },
        onResult2
    )
}

function catchLS(){
    chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        fillForm(message);               
        sendResponse("OK");
    });
}

function fillForm(lsMes){
    var doc1 = document;
    var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;
	var form1 = iFrm.querySelector("form");
    var btn1 = Array.from(iFrm.getElementsByClassName("b24-form-btn"));
    var numLs = Array.from(iFrm.getElementsByClassName("b24-form-control"));    
    var check1 = iFrm.querySelector('[value="9735"]');
    var check2 = iFrm.querySelector('[value="9732"]');
	var done = Array.from(iFrm.getElementsByClassName("b24-form-state b24-form-success"));
	var test = iFrm.querySelector("b24-form-header-title");
    
    //заполнение формы--------------------------------------------------
    check1.parentNode.click();  
     
    numLs[3].value = lsMes;
    numLs[3].dispatchEvent(new Event("input", { bubbles: true })); //событие смены инпута
    
    numLs[8].click();

    numLs[12].dispatchEvent(new Event("click", { bubbles: true })); //событие клик по списку
    setTimeout(() => {
    var numLs2 = Array.from(iFrm.getElementsByClassName("b24-form-control-list-selector-item"));
    let target = numLs2.find(el => el.innerText.trim() === "Пополнение лицевого счета");
	target.click();
    //numLs2[16].click();
    }, 500);

    setTimeout(() => {
    numLs[56].dispatchEvent(new Event("click", { bubbles: true })); //событие клик по списку
    }, 500);

    setTimeout(() => {
    var numLs3 = Array.from(iFrm.getElementsByClassName("b24-form-control-list-selector-item-title"));
    let target = numLs3.find(el => el.innerText.trim() === "Пополнение в ЦПиО");
	target.click();
    //numLs3[0].click();
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
    //numLs.forEach(function(item,ind){
    //        item.value = ind;
    //});
    
}

function onResult2(){
    //alert("done");
}