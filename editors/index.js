'use strict';

class Editor {
  constructor() {
    this.name = 'Editor';
    this.editorcontent = document.querySelector('#editor');
    this.outputcontent = document.querySelector('#output');
    this.restoreFromStore();
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
    document.querySelector('#fontSize')
      .addEventListener('change', (event) => {
        const { value } = event.target;
        const fontSize = parseInt(value, 10);
        this.doAction('fontSize', fontSize);
      }, true);
    this.editorcontent.addEventListener('keyup', this.output);
    this.editorcontent.addEventListener('compositionend', this.output);
  }

  doAction(action, args = null) {
    if (action === 'foreColor') {
      args = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    const res = document.execCommand(action, false, args);
    console.log('action: %s, result: %s', action, res);
    this.output();
  }

  output = () => {
    this.outputcontent.innerHTML = this.editorcontent.innerHTML;
    this.saveToStore();
  }

  saveToStore() {
    window.localStorage.setItem('editorcontent', this.editorcontent.innerHTML);
  }

  restoreFromStore() {
    this.editorcontent.innerHTML = window.localStorage.getItem('editorcontent');
  }
}

window._editor = new Editor();
