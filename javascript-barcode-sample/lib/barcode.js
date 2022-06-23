'use strict';

function CODE128(string) {
  this.string128 = string+'';
  this.valid = valid;
  this.encoded = function() {
    if (valid(string)) {
      return calculate(string);
    } else{
      return '';
    }
  }
  var code128 = [
    //32
    [' ','11011001100',0],
    ['!','11001101100',1],
    ['\'','11001100110',2],
    ['#','10010011000',3],
    ['$','10010001100',4],
    ['%','10001001100',5],
    ['&','10011001000',6],
    ['\'','10011000100',7],
    ['(','10001100100',8],
    [')','11001001000',9],
    ['*','11001000100',10],
    ['+','11000100100',11],
    [',','10110011100',12],
    ['-','10011011100',13],
    ['.','10011001110',14],
    ['/','10111001100',15],
    ['0','10011101100',16],
    ['1','10011100110',17],
    ['2','11001110010',18],
    ['3','11001011100',19],
    ['4','11001001110',20],
    ['5','11011100100',21],
    ['6','11001110100',22],
    ['7','11101101110',23],
    ['8','11101001100',24],
    ['9','11100101100',25],
    [':','11100100110',26],
    [';','11101100100',27],
    ['<','11100110100',28],
    ['=','11100110010',29],
    ['>','11011011000',30],
    ['?','11011000110',31],
    ['@','11000110110',32],
    ['A','10100011000',33],
    ['B','10001011000',34],
    ['C','10001000110',35],
    ['D','10110001000',36],
    ['E','10001101000',37],
    ['F','10001100010',38],
    ['G','11010001000',39],
    ['H','11000101000',40],
    ['I','11000100010',41],
    ['J','10110111000',42],
    ['K','10110001110',43],
    ['L','10001101110',44],
    ['M','10111011000',45],
    ['N','10111000110',46],
    ['O','10001110110',47],
    ['P','11101110110',48],
    ['Q','11010001110',49],
    ['R','11000101110',50],
    ['S','11011101000',51],
    ['T','11011100010',52],
    ['U','11011101110',53],
    ['V','11101011000',54],
    ['W','11101000110',55],
    ['X','11100010110',56],
    ['Y','11101101000',57],
    ['Z','11101100010',58],
    ['[','11100011010',59],
    ['\\','11101111010',60],
    [']','11001000010',61],
    ['^','11110001010',62],
    ['_','10100110000',63],
    ['`','10100001100',64],
    ['a','10010110000',65],
    ['b','10010000110',66],
    ['c','10000101100',67],
    ['d','10000100110',68],
    ['e','10110010000',69],
    ['f','10110000100',70],
    ['g','10011010000',71],
    ['h','10011000010',72],
    ['i','10000110100',73],
    ['j','10000110010',74],
    ['k','11000010010',75],
    ['l','11001010000',76],
    ['m','11110111010',77],
    ['n','11000010100',78],
    ['o','10001111010',79],
    ['p','10100111100',80],
    ['q','10010111100',81],
    ['r','10010011110',82],
    ['s','10111100100',83],
    ['t','10011110100',84],
    ['u','10011110010',85],
    ['v','11110100100',86],
    ['w','11110010100',87],
    ['x','11110010010',88],
    ['y','11011011110',89],
    ['z','11011110110',90],
    ['{','11110110110',91],
    ['|','10101111000',92],
    ['}','10100011110',93],
    ['~','10001011110',94],
    //126
    [String.fromCharCode(127),'10111101000',95],
    [String.fromCharCode(128),'10111100010',96],
    [String.fromCharCode(129),'11110101000',97],
    [String.fromCharCode(130),'11110100010',98],
    [String.fromCharCode(131),'10111011110',99],
    [String.fromCharCode(132),'10111101110',100],
    [String.fromCharCode(133),'11101011110',101],
    [String.fromCharCode(134),'11110101110',102],
    //Start codes
    [String.fromCharCode(135),'11010000100',103],
    [String.fromCharCode(136),'11010010000',104],
    [String.fromCharCode(137),'11010011100',105]
  ];

  var endBin = '1100011101011';
  var regexp = /^[!-~ ]+$/;
  function valid() {
    if (string.search(regexp)==-1) {
      return false;
    }
    return true;
  }
  function calculateCode128(string, encodeFn, startCode, checksumFn) {
    var result = '';
    result += encodingById(startCode);
    result += encodeFn(string);
    result += encodingById(checksumFn(string, startCode));
    result += endBin;
    return result;
  }
  var calculate =  function(string) {
    return calculateCode128(string, encodeB, 104, checksumB);
  }
  function encodeB(string) {
    var result = '';
    var temp = '';
    for (var i=0;i<string.length;i++) {
      result+=encodingByChar(string[i]);
      temp += string[i]+'的编码值为:'+encodingByChar(string[i])
    }
    return result;
  }
  function checksumB(string, startCode) {
    var sum = 0;
    for (var i=0;i<string.length;i++) {
      sum += weightByCharacter(string[i])*(i+1);
    }
    return (sum+startCode) % 103;
  }
  function encodingById(id) {
    for (var i=0;i<code128.length;i++) {
      if (code128[i][2]==id) {
        return code128[i][1];
      }
    }
    return '';
  }
  function weightByCharacter(character) {
    for (var i=0;i<code128.length;i++) {
      if (code128[i][0]==character) return code128[i][2];
    }
    return 0;
  }
  function encodingByChar(character) {
    for (var i=0;i<code128.length;i++) {
      if (code128[i][0]==character) return code128[i][1];
    }
    return '';
  }
}

var canvas;

if (typeof document !== 'undefined') {
  canvas = document.createElement('canvas');
} else {
  var Canvas = require('canvas');
  canvas = new Canvas();
}

var merge = function(m1, m2) {
  var newMerge = {};

  for (var k in m1) {
    newMerge[k] = m1[k];
  }
  for (var k in m2) {
    newMerge[k] = m2[k];
  }
  return newMerge;
};

var defaults = {
  width:	2,
  height:	100,
  quite: 10,
  format:	'CODE128',
  displayValue: true,
  font:'Monospaced',
  textAlign:'center',
  fontSize: 20,
  backgroundColor:'',
  lineColor:'#000'
};

function Barcode(content, options) {
  options = merge(defaults, options);

  var encoder = new CODE128(content);
  if (!encoder.valid()) return this;
  var binary = encoder.encoded();
  var _drawBarcodeText = function (text) {
    var x, y;
    y = options.height;
    ctx.font = options.fontSize + 'px '+options.font;
    ctx.textBaseline = 'bottom';
    ctx.textBaseline = 'top';

    if (options.textAlign == 'left') {
      x = options.quite;
      ctx.textAlign = 'left';
    } else if (options.textAlign == 'right') {
      x = canvas.width - options.quite;
      ctx.textAlign = 'right';
    } else {
      x = canvas.width / 2;
      ctx.textAlign = 'center';
    }
    ctx.fillText(text, x, y);
  }

  var ctx	= canvas.getContext('2d');
  canvas.width = binary.length*options.width+2*options.quite;
  canvas.height = options.height + (options.displayValue ? options.fontSize : 0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (options.backgroundColor) {
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  ctx.fillStyle = options.lineColor;
  for (var i=0;i<binary.length;i++) {
    var x = i*options.width+options.quite;
    if (binary[i] == '1') {
      ctx.fillRect(x,0,options.width,options.height);
    }
  }
  if (options.displayValue) _drawBarcodeText(content);
  var uri = canvas.toDataURL('image/png');
  return uri;
}

;(function(root, factory) {
  'use strict';
  /* amd like aml https://github.com/xudafeng/aml.git */
  if (typeof define === 'function' && define.amd) {
    return define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    return factory(exports);
  } else {
    /* browser */
    factory(root['barcode'] || (root['barcode'] = {}));
  }
})(this, function(exports, undefined) {
  exports.Barcode = Barcode;
});
