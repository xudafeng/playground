'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pkg = require('./package');
const assetsPath = path.join(__dirname, 'src');

module.exports = {

  entry: {
    [pkg.name]: path.join(assetsPath, 'App'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].js',
  },

  resolve: {
    alias: {
      '@': assetsPath,
    },
    extensions: [ '.js', '.jsx' ],
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.json$/,
        type: 'javascript/auto',
        use: 'json-loader',
        exclude: /node_modules/,
      }, {
        test: /\.less$/,
        exclude(filePath) {
          return filePath.endsWith('.module.less');
        },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                math: 'always',
              },
            },
          },
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                math: 'always',
              },
            },
          },
        ],
      },
      {
        test: /.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: '[name]',
            },
          },
          {
            loader: 'svgo-loader',
          },
        ],
        include: [
          path.resolve(__dirname, 'assets', 'icons'),
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version),
    }),
  ],

  devtool: 'source-map',

  devServer: {
    hot: true,
    static: {
      directory: __dirname,
    },
  },
};
