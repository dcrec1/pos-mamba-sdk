import extendDriver from '../drivers/extend.js';
import Signal from '../simulator/libs/signal.js';

const $Http = extendDriver({});

// init signals
const SIGNALS = ['requestFinished', 'requestFailed'];

function initSignals() {
  SIGNALS.forEach(signal => {
    $Http[signal] = Signal();
  });
}

let _errorData;

let _data;

initSignals();

$Http.getError = function getError() {
  return _errorData;
};

$Http.getData = function getData() {
  return _data;
};

$Http.doSend = function send({ method = 'GET', url = '', data, headers }) {
  const myHeaders = new Headers();
  if (headers) {
    Object.keys(headers).forEach(key => {
      myHeaders.append(key, headers[key]);
    });
  }

  const request = new Request(url, {
    method,
    body: JSON.stringify(data),
    headers: myHeaders,
  });

  fetch(request)
    .then(dataRequest => {
      _data = dataRequest;
      $Http.fire('requestFinished');
    })
    .catch(error => {
      _errorData = error;
      $Http.fire('requestFailed');
    });
};

window.$Http = $Http;
