import './app.js';
import './cancellation.js';
import './card.js';
import './http.js';
import './keyboard.js';
import './merchant.js';
import './payment.js';
import './printer.js';
import './storage.js';
import './system.js';

onmessage = function handleAndroiEvent(e) {
  console.log('aqui no JS de boa');
  console.log(e.data);
  console.log(JSON.stringify(e));
};
