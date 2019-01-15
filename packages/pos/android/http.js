import Signal from '../simulator/libs/signal.js';

const { $Http } = window;

// init signals
const SIGNALS = ['requestFinished', 'requestFailed'];

function initSignals() {
  SIGNALS.forEach(signal => {
    $Http[signal] = Signal();
  });
}

initSignals();
