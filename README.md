# Tabbit / Chrome Wheel Tab Switcher Extension

An elegant and lightweight Chrome/Tabbit extension that lets you switch between tabs using your mouse scroll wheel.

## Features

Since browser extensions cannot directly intercept scroll events on the native/custom browser tab bar due to security and sandbox restrictions, this extension implements two highly intuitive and seamless workarounds on web pages:

1. **Top Edge Scroll**: Hover your mouse at the very top edge of any webpage (within the top 20 pixels) and scroll your mouse wheel up or down to switch tabs instantly.
2. **Alt + Scroll Shortcut**: Hold the `Alt` key and scroll your mouse wheel anywhere on the webpage to cycle through tabs.

## Installation Instructions

1. **Download the Extension**: Download the packaged extension zip file.
2. **Unzip the Files**: Extract the zip archive to a local folder on your computer.
3. **Open Extensions Page**: In Tabbit (or Chrome), open a new tab and go to `chrome://extensions/` (or click Menu -> Extensions -> Manage Extensions).
4. **Enable Developer Mode**: Toggle the **Developer mode** switch in the top-right corner of the Extensions page.
5. **Load Unpackaged Extension**: Click the **Load unpacked** button in the top-left corner.
6. **Select Folder**: Select the unzipped folder containing `manifest.json`.
7. **Refresh Webpages**: Go to any open webpage and refresh it (or open a new tab) to let the content script inject.

## Implementation Details

- **Manifest V3**: Compliant with the latest extension standards.
- **Throttling**: Scroll events are throttled at `180ms` to prevent overly sensitive or rapid switching.
- **Support for Multi-directional Scroll**: Supports both vertical wheel scrolls and horizontal scrolls.

---
Created by Tabbit Agent. Happy Browsing!