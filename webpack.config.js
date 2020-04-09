const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app_bin.js',
  },
  devServer: {
    inline: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/react'],
        },
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
