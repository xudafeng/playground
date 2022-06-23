'use strict';

module.exports = {
  sleep(second) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, second || 1000);
    });
  },
};
