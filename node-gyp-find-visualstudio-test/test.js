'use strict';

const path = require('path');
const { execFile } = require('child_process');

const findVisualStudio2017OrNewer = function(cb) {
  const ps = path.join(
    process.env.SystemRoot, 
    'System32',
    'WindowsPowerShell',
    'v1.0',
    'powershell.exe',
  );
  const csFile = path.join(__dirname, 'Find-VisualStudio.cs');
  const psArgs = [
    '-ExecutionPolicy',
    'Unrestricted',
    '-NoProfile',
    '-Command',
    '&{Add-Type -Path \'' + csFile + '\';' + '[VisualStudioConfiguration.Main]::PrintJson()}',
  ];

  console.log('Running', ps, psArgs);

  const child = execFile(ps, psArgs, {
    encoding: 'utf8',
  }, cb);
  child.stdin.end();
};

findVisualStudio2017OrNewer((err, stdout, stderr) => {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.parse(stdout));
  }
});