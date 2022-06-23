'use strict';

const {
  app,
  BrowserWindow,
} = require('electron');
const fs = require('fs');
const path = require('path');
const program = require('commander');

program
  .option('--target-url <s>', 'target url')
  .option('--script <s>', 'path to script file');

program.parse(process.argv);

const scriptFile = path.resolve(program.script);

console.log('--target-url: %s', program.targetUrl);
console.log('--script: %s', scriptFile);
let mainWindow;

app.on('ready', () => {
  console.log('electron app is ready');

  mainWindow = new BrowserWindow({
    show: true,
    alwaysOnTop: false,
    x: 0,
    y: 0,
    width: 1280,
    height: 800,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      allowDisplayingInsecureContent: true,
      backgroundThrottling: false
    }
  });
  mainWindow.loadURL(program.targetUrl);

  const content = fs.readFileSync(scriptFile, 'utf8');

  // mainWindow.webContents.on('console-message', console.log);
  mainWindow.webContents.on('dom-ready', async () => {
    console.log('main-window web content dom ready');
    mainWindow.webContents.openDevTools();
    const res = await mainWindow.webContents.executeJavaScript(content);
    // TODO write to harddisk
    console.log(JSON.stringify(res, null, 2));
  });
});
