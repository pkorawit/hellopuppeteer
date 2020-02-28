console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let payload = {
    command: 'startSelector'
  };
  chrome.tabs.sendMessage(tab.id, payload);
}