console.log("[Wheel Tab Switcher] Background script loaded.");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[Wheel Tab Switcher] Received message in background:", message);
  
  if (message.action === "switchTab") {
    const direction = message.direction;
    
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      if (tabs.length <= 1) {
        console.log("[Wheel Tab Switcher] Only 1 tab or none open, skipping.");
        return;
      }
      
      // Sort tabs by index to ensure proper order
      tabs.sort((a, b) => a.index - b.index);
      console.log("[Wheel Tab Switcher] Current tabs count:", tabs.length);
      
      const activeTabIndex = tabs.findIndex(tab => tab.active);
      if (activeTabIndex === -1) {
        console.log("[Wheel Tab Switcher] No active tab found.");
        return;
      }
      
      let nextIndex = activeTabIndex;
      if (direction === "left") {
        nextIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
      } else if (direction === "right") {
        nextIndex = (activeTabIndex + 1) % tabs.length;
      }
      
      console.log(`[Wheel Tab Switcher] Switching from index ${activeTabIndex} to ${nextIndex} (ID: ${tabs[nextIndex].id})`);
      
      chrome.tabs.update(tabs[nextIndex].id, { active: true }, (tab) => {
        if (chrome.runtime.lastError) {
          console.error("[Wheel Tab Switcher] Failed to switch tab:", chrome.runtime.lastError);
        } else {
          console.log("[Wheel Tab Switcher] Successfully switched to tab:", tab.title);
        }
      });
    });
  }
});