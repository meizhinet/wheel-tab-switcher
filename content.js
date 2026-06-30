console.log("[Wheel Tab Switcher] Content script successfully injected on:", window.location.href);

let isThrottled = false;
const THROTTLE_DELAY = 180; // milliseconds to prevent rapid uncontrollable switching

window.addEventListener("wheel", (event) => {
  // Option 1: Scroll at the top of the viewport (clientY <= 50)
  // Option 2: Scroll while holding the Alt key
  const isAtTop = event.clientY <= 50;
  const isAltPressed = event.altKey;

  if (isAtTop || isAltPressed) {
    console.log(`[Wheel Tab Switcher] Scroll event detected. clientY: ${event.clientY}, altKey: ${isAltPressed}`);
    
    if (isThrottled) {
      console.log("[Wheel Tab Switcher] Scroll throttled, skipping message.");
      event.preventDefault();
      return;
    }
    
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, THROTTLE_DELAY);

    // Prevent default scrolling on the page
    event.preventDefault();
    event.stopPropagation();

    // Support both vertical scroll deltaY and horizontal scroll deltaX
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    
    if (delta !== 0) {
      const direction = delta > 0 ? "right" : "left";
      console.log(`[Wheel Tab Switcher] Sending switchTab message with direction: ${direction}`);
      chrome.runtime.sendMessage({ action: "switchTab", direction: direction }).catch(err => {
        console.error("[Wheel Tab Switcher] Failed to send message to background:", err);
      });
    }
  }
}, { passive: false, capture: true });