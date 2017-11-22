(function() {
  var list = window._datahub.list;
  var container = document.createElement('div');
  container.id = '_datahub';
  document.body.appendChild(container);
  var html = `
    <style>
      #_datahub {
        position: fixed;
        z-index: 9999999;
        bottom: 10px;
        right: 10px;
        border-radius: 5px;
        text-align: left;
        font-size: ${10 * window.devicePixelRatio}px;
      }
      #_datahub table {
        border-collapse: collapse;
      }
      #_datahub th,
      #_datahub td {
        font-weight: normal;
        border: 1px solid #cad9ea;
        padding: 1px 2px;
      }
      #_datahub ._datahub_button {
        clear: both;
        text-align: center;
        overflow: hidden;
        background: #d0d0d0;
      }
      #_datahub ._datahub_button p {
        width: 50%;
        float: left;
      }
    </style>
  `;
  html += '<table>';
  html += '<tr>';
  html += '<th>router</th>';
  html += '<th>hub</th>';
  html += '<th>host</th>';
  html += '</tr>';
  list.forEach(function(data) {
    html += '<tr>';
    html += '<td>' + data.router + '</td>';
    html += '<td>' + data.hub + '</td>';
    html += '<td>';
    html += '<a href="http://' + data.hostname + ':' + data.port + '/project/' + data.hub + '" target="_blank">';
    html += data.hostname + ':' + data.port;
    html += '</a></td>';
    html += '</tr>';
  });
  html += '</table>';
  html += '<div class="_datahub_button">';
  html += '<p>Refresh</p>';
  html += '<p>Hide</p>';
  html += '</div>'
  container.innerHTML = html;
  var buttons = document.querySelectorAll('._datahub_button p');
  buttons[0].onclick = function() {
    location.reload();
  };
  buttons[1].onclick = function() {
    container.style.display = 'none';
  };
})();
