'use strict';

const inputElement = document.querySelector('#input-text');
const itemsElement = document.querySelector('#items');
const textElement = document.querySelector('#text');

const render = data => {
  itemsElement.innerHTML = JSON.stringify(data.items, null, 2);
  textElement.innerHTML = data.text;
};

const handleVaue = value => {
  jQuery.ajax({
    method: 'get',
    url: '/api/nlp',
    data: {
      text: value,
    },
    success: data => {
      render(data);
    },
  });
};
inputElement.addEventListener('change', e => {
  handleVaue(e.currentTarget.value);
}, false);
