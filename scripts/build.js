'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { sync: globby } = require('globby');

const pkg = require('../package');

function getContent() {
  const startToken = '<!-- GITCONTRIBUTOR_START -->';
  const endToken = '<!-- GITCONTRIBUTOR_END -->';  
  const baseURL = pkg.repository.page;
  let res = [];
  const list = globby(['**/*.html', '!**/node_modules/**']);
  const groupData = _.groupBy(list, (item) => {
    return item.split('/')[0];
  });
  Object.keys(groupData).forEach(key => {
    res.push(`## ${key}`);
    res.push(groupData[key].map(item => `- ${baseURL}/${item}`).join('\n'));
  });
  return {
    startToken,
    endToken,
    content: `${startToken}\n${res.join('\n')}\n${endToken}`,
  };
}

const res = getContent();

const readmeFile = path.resolve(__dirname, '..', 'README.md');
const readmeContent = fs.readFileSync(readmeFile, 'utf8')
  .replace(new RegExp(`${res.startToken}[^]*${res.endToken}`), res.content);

console.log('README.md updated: \n\n%s', readmeContent);

fs.writeFileSync(readmeFile, readmeContent);
