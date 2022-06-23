// 3d-box-sample demo
'use strict';

(function(global, undefined) {
  var element = document.querySelector('#click');
  var container = document.querySelector('.container');
  var className = container.className;

  element.addEventListener('click', function() {
    var _className = container.className;
    if (!!~_className.indexOf('turn')) {
      container.className = className;
    } else {
      container.className = className + ' turn';
    }
  });
})(this);
