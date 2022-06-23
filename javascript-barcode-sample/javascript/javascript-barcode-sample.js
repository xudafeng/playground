// javascript-barcode-sample demo
'use strict';

;(function(global, undefined) {
  var data = 'hello alibaba!';
  data = barcode.Barcode(data);
  document.getElementById('barcode').src = data;
})(this);
