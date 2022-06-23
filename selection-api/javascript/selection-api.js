// selection-api demo
'use strict';

document.addEventListener('selectionchange', () => {
  const text = window.getSelection().toString();
  console.log(text);
  return text;
});

customEvent = document.createEvent('MouseEvents');
customEvent.initEvent('selectionchange', true, true);