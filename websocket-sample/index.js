'use strict';

var result = [];
var entries = window.performance.getEntries();
entries.forEach(function(perf) {
  result.push({
    url: perf.name,
    type: perf.initiatorType,
    duration: perf.duration.toFixed(2)
  });
});
console.table(result);

var getTimes = function () {
  var timing = window.performance.timing;
  var res = {};

  for (var k in timing) {
    if (timing.hasOwnProperty(k)) {
      res[k] = timing[k];
    }
  }

  // Total time from start to load
  res.loadTime = timing.loadEventEnd - timing.fetchStart;
  // Time spent constructing the DOM tree
  res.domReadyTime = timing.domComplete - timing.domInteractive;
  // Time consumed preparing the new page
  res.readyStart = timing.fetchStart - timing.navigationStart;
  // Time spent during redirection
  res.redirectTime = timing.redirectEnd - timing.redirectStart;
  // AppCache
  res.appcacheTime = timing.domainLookupStart - timing.fetchStart;
  // Time spent unloading documents
  res.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
  // DNS query time
  res.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
  // TCP connection time
  res.connectTime = timing.connectEnd - timing.connectStart;
  // Time spent during the request
  res.requestTime = timing.responseEnd - timing.requestStart;
  // Request to completion of the DOM loading
  res.initDomTreeTime = timing.domInteractive - timing.responseEnd;
  // Load event time
  res.loadEventTime = timing.loadEventEnd - timing.loadEventStart;

  return res;
};

var timing = getTimes();
console.log(timing);
