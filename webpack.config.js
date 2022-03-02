const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;
const IS_SERVE = !!process.env.IS_SERVE;

const SRC_PATH = path.join(__dirname, 'src');
const DEV_IP = 'localhost';
const DEV_PORT = 10004;
const PLUGIN_URL = IS_SERVE ? `https://${DEV_IP}:${DEV_PORT}` : '.';

module.exports = {
  entry: {
    panel: path.resolve(SRC_PATH, 'panel/index.js'),
      md5: path.resolve(SRC_PATH,'panel/md5.js'),
  },
  output: {
    publicPath:'/',
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'window',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: path.resolve(__dirname, './node_modules'),
      },
    ],
  },
  resolve: {
    alias: {
      '@': SRC_PATH,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, './panel/panel.html'),
      filename: 'panel.html',
      chunks: ['panel'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './manifest.json'),
          transform(content) {
            return content.toString().replace(new RegExp('<%__THE_PLUGIN_URL__%>', 'g'), PLUGIN_URL);
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.DEBUG': JSON.stringify(!IS_PROD),
    }),
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    https: true,
    key: fs.readFileSync('./certificate/server.key'),
    cert: fs.readFileSync('./certificate/server.crt'),
    host: DEV_IP,
    port: DEV_PORT,
    injectClient: false,
  },
};
