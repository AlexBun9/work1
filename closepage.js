//поиск элемента и закрытие с интервалами
setInterval(() => {
  const found = document.querySelector('.b24-form-state-text');
  if (found && found.textContent.includes('Спасибо, Ваше обращение принято')) {
    chrome.runtime.sendMessage({ action: 'closeTab' });
  }
}, 5000);