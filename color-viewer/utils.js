'use strict';

exports.oppositeColor = color => {
  color = color.replace('#', '');
  var res = [];

  for (let i = 0; i < color.length; i++) {
    var temp = parseInt(15 - parseInt(color.charAt(i), 16), 10);
    res.push(temp.toString(16));
  }
  return `#${res.join('')}`;
};

exports.rgb2hex = rgb => {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  const hex = x => {
    return (`0${parseInt(x, 10).toString(16)}`).slice(-2);
  };
  return `#${hex(rgb[1])}${hex(rgb[2])}${hex(rgb[3])}`;
};
