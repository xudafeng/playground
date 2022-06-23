'use strict';

const fs = require('fs');
const path = require('path');
const { Controller } = require('egg');
const { render: Render } = require('microtemplate');

const templateFile = path.join(__dirname, '..', 'template.html');
const template = fs.readFileSync(templateFile, 'utf8');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = Render(template, {
    }, {
      tagOpen: '<#',
      tagClose: '#>',
    });
  }
}

module.exports = HomeController;
