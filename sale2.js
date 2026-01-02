const grabBtn31 = document.getElementById("grabBtn31");
const pageSaleTI = "https://b24.avtodor-tr.ru/crm/deal/details/0/?category_id=25";

if (grabBtn31){
grabBtn31.addEventListener("click",() => {   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {  
            execScriptSaleTI(tab);
			
        } else {
            alert("Не нашел вкладку")
        }
    })
})
}

function execScriptSaleTI(tab) {
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:takeLSSaleTI
        },
        onResultSaleTI
    )
}

function takeLSSaleTI() {  
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

function onResultSaleTI(var12) {  
    if (!var12 || !var12.length) { 
         alert("Не нашел ЛС");
        return;
    }
    const res1 = var12.map(var12=>var12.result)
    openPageSaleTI(res1);
}


function openPageSaleTI(ls) {
    chrome.tabs.create({url: pageSaleTI, active: false},(tab) => {  
		let checkInterval = setInterval(() => {
			chrome.tabs.get(tab.id, (updatedTab) => {
				if (updatedTab.status === "complete") {
					clearInterval(checkInterval);
					console.log("Страница загружена:", updatedTab.url);
					// Здесь можно выполнить действия с загруженной страницей					
					execScriptSaleTI2(tab);       
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

function execScriptSaleTI2(tab) {    
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:catchLSSaleTI
        },
        onResultSaleTI2
    )
}

function catchLSSaleTI(){
     chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        setTimeout(() => {
		fillFormSaleTI(message);  
		}, 1000);		
        sendResponse("OK");
    });
}

function fillFormSaleTI(lsMes){
	
	var doc1 = document; 
   var iFrm = Array.from(document.getElementsByClassName("side-panel-iframe"))[0].contentDocument;
   var inputs1 = iFrm.querySelector('[name="UF_CRM_6343ADB4B9043"]');
   var inputs2 = iFrm.querySelector('[name="UF_DEALTYPE"]');   
   var inputs3 = iFrm.querySelector('[name="UF_REASON2BUY"]');
   var inputs4 = iFrm.querySelector('[name="UF_PROMO2BUY"]');
   var inputs5 = iFrm.querySelector('[name="UF_PROMOSHEET"]');
   
   var inputsText = iFrm.querySelectorAll('.main-ui-select-name');
   
	setTimeout(() => {
		inputs2.value = "7187";
		inputsText[0].textContent = "Сотрудник предложил покупку"
	}, 700);
	setTimeout(() => {
		inputs3.value = "7223";
		inputsText[1].textContent = "Скидка на покупку ЭСРП"
	}, 700);
	setTimeout(() => {
		inputs4.value = "7168";
		inputsText[2].textContent = "Рассказал сотрудник"
	}, 700);
	setTimeout(() => {
		inputs5.value = "7176";
		inputsText[3].textContent = "TRADE-IN (скидка 30%)"
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

function onResultSaleTI2(){
    
}