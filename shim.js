/**
 * Polyfill for EventEmitter - must load before any code that requires('events')
 * Fixes: "cannot read property EventEmitter of undefined"
 */
try {
  const events = require('events');
  if (events && events.EventEmitter) {
    global.EventEmitter = events.EventEmitter;
    if (typeof global.__eventsPolyfilled === 'undefined') {
      global.__eventsPolyfilled = true;
    }
  }
} catch (e) {
  // no-op if events not available
}
