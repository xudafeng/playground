(async () => {
  console.log('web runtime ready');
  const { app } = require('electron');
  const docList = [
    "https://www.yuque.com/yuque/help/about",
    "https://www.taobao",
  ];
  const res = [];

  for (let i = 0; i < docList.length; i++) {
    const url = docList[i];
    const webview = document.createElement('webview');
    webview.setAttribute('autosize', 'on');
    webview.setAttribute('nodeintegration', true);
    webview.setAttribute('disablewebsecurity', false);
    webview.setAttribute('src', url);
    webview.setAttribute('style', 'width: 100%;display: flex;height: 100%;position: fixed;left: 0;top: 0;z-index: 9999999;');
    res.push(await new Promise((resolve, reject) => {
      webview.addEventListener('dom-ready', () => {
        const script = '(() => { return window.appData && window.appData.doc && window.appData.doc.id })();';
        // console.log(script);
        console.log(url);
        webview.executeJavaScript(script)
          .then(resolve)
          .catch(reject);
      });
      document.body.appendChild(webview);
    }));
  }
  return res;
})();