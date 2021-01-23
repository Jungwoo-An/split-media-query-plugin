/* eslint-disable */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SplitMediaQueryPlugin = require('../dist/split-media-query-plguin');

console.log(SplitMediaQueryPlugin);

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../docs'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new MiniCssExtractPlugin(),
    new SplitMediaQueryPlugin(),
  ],
};
