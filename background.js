chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "switchTab") {
    const direction = message.direction;
    
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      if (tabs.length <= 1) return;
      
      // Filter out any tabs that are not addressable or restricted (like chrome:// URLs can't have content scripts, but tabs API still lists them)
      // Sort tabs by index to ensure proper order
      tabs.sort((a, b) => a.index - b.index);
      
      const activeTabIndex = tabs.findIndex(tab => tab.active);
      if (activeTabIndex === -1) return;
      
      let nextIndex = activeTabIndex;
      if (direction === "left") {
        nextIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
      } else if (direction === "right") {
        nextIndex = (activeTabIndex + 1) % tabs.length;
      }
      
      chrome.tabs.update(tabs[nextIndex].id, { active: true });
    });
  }
});