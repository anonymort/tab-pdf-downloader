document.getElementById('downloadButton').addEventListener('click', function() {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        if (tab.url.toLowerCase().endsWith('.pdf')) {
          chrome.downloads.download({
            url: tab.url,
            filename: tab.title.endsWith('.pdf') ? tab.title : tab.title + '.pdf',
            saveAs: false
          });
        }
      });
    });
  });
  
  // Set badge text when popup opens
  chrome.action.setBadgeText({text: 'PDF'});
  
  // Clear badge text when popup closes
  window.addEventListener('unload', function() {
    chrome.action.setBadgeText({text: ''});
  });