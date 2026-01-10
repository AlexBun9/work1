//поиск элемента и закрытие с интервалами
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === 'closeTab' && sender.tab) {
    setTimeout(() => chrome.tabs.remove(sender.tab.id), 2000);
  }
  return true;
});