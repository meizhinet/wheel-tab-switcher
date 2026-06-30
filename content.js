let isThrottled = false;
const THROTTLE_DELAY = 180; // milliseconds to prevent rapid uncontrollable switching

window.addEventListener("wheel", (event) => {
  // Option 1: Scroll at the very top of the viewport (clientY <= 20)
  // Option 2: Scroll while holding the Alt key
  const isAtTop = event.clientY <= 20;
  const isAltPressed = event.altKey;

  if (isAtTop || isAltPressed) {
    if (isThrottled) {
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
      chrome.runtime.sendMessage({ action: "switchTab", direction: direction });
    }
  }
}, { passive: false, capture: true });