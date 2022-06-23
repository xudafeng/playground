'use strict';

const MacacaAIEngine = require('macaca-ai-engine');

module.exports = app => {
  app.engine = new MacacaAIEngine();
};
