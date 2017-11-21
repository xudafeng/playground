(function() {
  var list = window._datahub.list;
  list.forEach(function(data) {
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.zIndex.position = 9999999;
    div.style.bottom = '10px';
    div.style.right = '10px';
    div.innerHTML = data.router + ' | ' + data.hostname + ' | ' + data.port;
    document.body.appendChild(div);
  });
})();
