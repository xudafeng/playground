(function() {
  var list = window._datahub.list;
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.zIndex.position = 9999999;
  container.style.bottom = '10px';
  container.style.right = '10px';
  container.style.borderRadius = '5px';
  container.style.textAlign = 'left';
  container.style.fontSize = 10 * window.devicePixelRatio + 'px';
  container.id = '_datahub';
  document.body.appendChild(container);
  var html = `
    <style>
      #_datahub table {
        border-collapse: collapse;
      }
      #_datahub th,
      #_datahub td {
        font-weight: normal;
        border: 1px solid #cad9ea;
        padding: 1px 2px;
      }
    </style>
  `;
  html += '<table>';
  html += '<tr>';
  html += '<th>router</th>';
  html += '<th>scene</th>';
  html += '<th>hub</th>';
  html += '<th>host</th>';
  html += '</tr>';
  list.forEach(function(data) {
    html += '<tr>';
    html += '<td>' + data.router + '</td>';
    html += '<td>' + 'default' + '</td>';
    html += '<td>' + data.hub + '</td>';
    html += '<td>';
    html += '<a href="http://' + data.hostname + ':' + data.port + '/project/' + data.hub + '" target="_blank">';
    html += data.hostname + ':' + data.port;
    html += '</a></td>';
    html += '</tr>';
  });
  html += '</table>';
  container.innerHTML = html;
})();
