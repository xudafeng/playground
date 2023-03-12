const path = require('path');

module.exports = {
  entry: {
    main: './src/index.jsx',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  builtins: {
    html: [{ template: './src/index.html' }],
  },
};
