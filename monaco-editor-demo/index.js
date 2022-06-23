'use strict';

require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.22.3/min/vs',
  }
});

const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');

require(['vs/editor/editor.main'], () => {
  fetch('./').then(response => response.text()).then(html => {
    window.editor1 = monaco.editor.create(container1, {
      value: html,
      language: 'html',
      automaticLayout: true
    });
  });
  const jsonData = {
    foo: 'bar',
    test: {
      name: 'foo',
    },
  }; 
  window.editor2 = monaco.editor.create(container2, {
    value: JSON.stringify(jsonData, null, 2),
    language: 'json',
    automaticLayout: true
  });
});
