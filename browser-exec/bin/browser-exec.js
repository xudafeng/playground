#!/usr/bin/env node

'use strict';

const path = require('path');
const electron_path = require('electron');
const child_process = require('child_process');

const runner = path.join(__dirname, '..', 'lib', 'runner.js');

child_process.spawn(
  electron_path,
  [
    runner,
    '--no-sandbox',
    ...process.argv
  ],
  {
    stdio: [0, 1, 2, 'ipc']
  }
);

