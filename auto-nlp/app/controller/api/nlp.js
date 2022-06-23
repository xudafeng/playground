'use strict';

const { Controller } = require('egg');

class NLPController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { text } = ctx.query;
    const res = await app.engine.service.nlp.depparser(text);
    ctx.body = res;
  }
}

module.exports = NLPController;
