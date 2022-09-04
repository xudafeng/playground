'use strict';

class Editor {
  constructor() {
    this.name = 'Editor';
    this.editorcontent = document.querySelector('#editor');
    this.outputcontent = document.querySelector('#output');
    this.bindEvent();
  }

  bindEvent() {
    document.querySelectorAll('[data-action]')
      .forEach((button) => {
        button.addEventListener('click', (event) => {
          this.editorcontent.focus();
          const action = event.target.getAttribute('data-action');
          this.doAction(action);
        }, true);
      });
    this.editorcontent.addEventListener('keyup', this.output);
  }

  doAction(action, args = null) {
    const res = document.execCommand(action, false, args);
    console.log('action: %s, result: %s', action, res);
    this.output();
  }

  output = () => {
    this.outputcontent.innerHTML = this.editorcontent.innerHTML;
  }
}

window._editor = new Editor();
