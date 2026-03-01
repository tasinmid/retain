# Chat Widget

This directory contains a reusable chat widget that can be included on any page.

## Files

- `chat.js` - JavaScript functionality for the chat widget
- `chat.css` - CSS styling for the chat widget

## Usage

To add the chat widget to any page, include these two lines in your HTML:

```html
<!-- In the <head> section -->
<link rel="stylesheet" href="/chat.css">

<!-- Before closing </body> -->
<script src="/chat.js"></script>
```

## Features

- Floating chat widget with toggle button
- Dark theme with smooth animations
- Session-based conversations (stored in sessionStorage)
- User/bot message bubbles with typing indicators
- Auto-responsive design
- Connects to AI backend for responses

## Configuration

The chat widget automatically generates a unique session ID and connects to the configured webhook endpoint. No additional configuration is required.

## Browser Compatibility

Requires modern browser with:
- ES6 support (for sessionStorage, fetch API)
- CSS Grid and Flexbox support
- CSS transitions and animations
