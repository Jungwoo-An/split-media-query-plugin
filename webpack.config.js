/* eslint-disable */
const path = require('path');

module.exports = {
  entry: path.resolve('./lib/index.ts'),
  output: {
    path: path.resolve('./dist'),
    filename: 'split-media-query-plguin.js',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: {
    webpack: 'webpack',
    'html-webpack-plugin': 'html-webpack-plugin',
  },
};
