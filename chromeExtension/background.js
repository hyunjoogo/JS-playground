let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


chrome.action.onClicked.addListener((tab) => {
  showReadme();
});

function showReadme(info, tab) {
  let url = chrome.runtime.getURL("readme.html");
  chrome.tabs.create({ url });
}
