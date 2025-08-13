const grabBtn3 = document.getElementById("grabBtn3");
const pageSale = "https://b24.avtodor-tr.ru/crm/deal/details/0/?category_id=25";

if (grabBtn3){
grabBtn3.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptSale(tab);
			
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScriptSale(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:takeLSSale
        },
        onResultSale
    )
}

function takeLSSale() {  
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

function onResultSale(var12) {  
    if (!var12 || !var12.length) { 
         alert("Не нашел ЛС");
        return;
    }
    const res1 = var12.map(var12=>var12.result)
    openPageSale(res1);
}


function openPageSale(ls) {
    chrome.tabs.create({url: pageSale, active: false},(tab) => {  
		let checkInterval = setInterval(() => {
			chrome.tabs.get(tab.id, (updatedTab) => {
				if (updatedTab.status === "complete") {
					clearInterval(checkInterval);
					console.log("Страница загружена:", updatedTab.url);
					// Здесь можно выполнить действия с загруженной страницей					
					execScriptSale2(tab);       
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

function execScriptSale2(tab) {    
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:catchLSSale
        },
        onResultSale2
    )
}

function catchLSSale(){
     chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        setTimeout(() => {
		fillFormSale(message);  
		}, 1000);		
        sendResponse("OK");
    });
}

function fillFormSale(lsMes){
	
	var doc1 = document; 
   var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;
   var inputs1 = iFrm.querySelector('[name="UF_CRM_6343ADB4B9043"]');
   var inputs2 = iFrm.querySelector('[name="UF_DEALTYPE"]');   
   var inputs3 = iFrm.querySelector('[name="UF_REASON2BUY"]');
   var inputs4 = iFrm.querySelector('[name="UF_PROMO2BUY"]');
   
   var inputsText = iFrm.querySelectorAll('.main-ui-select-name');
   
	setTimeout(() => {
		inputs2.value = "7187";
		inputsText[0].textContent = "Сотрудник предложил покупку"
	}, 700);
	setTimeout(() => {
		inputs3.value = "7223";
		inputsText[1].textContent = "Безостановочный проезд на ПВП"
	}, 700);
	setTimeout(() => {
		inputs4.value = "7168";
		inputsText[2].textContent = "Покупка без акции"
	}, 700);
	
	setTimeout(() => {
		inputs1.value= lsMes; 
	}, 700);	
	//ПРОВЕРКА НА ЛОГИН
	setTimeout(() => {
		var btnLog = doc1.querySelector(".log-popup-wrap ");
		if(btnLog){alert("НУЖНО ЗАЛОГИНИТЬСЯ!!! НЕ ОТПРАВЛЯЙ!!!");};
		}, 1200);
}

function onResultSale2(){
    
}