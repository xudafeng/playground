'use strict';

async function throwErrorAsync() {
  throwErrorSync();
}

function throwErrorSync() {
  throw Error('error');
}

const p1 = new Promise((resolve) => {
  throwErrorSync();
  resolve({});
});

p1
  .then((d) => {
    console.log('p1 then', d);
  })
  .catch((e) => {
    console.log('p1 catch', e);
  });

const p2 = new Promise(async (resolve) => {
  await throwErrorAsync();
  resolve({});
});

p2
  .then((d) => {
    console.log('p2 then', d);
  })
  .catch((e) => {
    // can't catch the error
    console.log('p2 catch', e);
  });