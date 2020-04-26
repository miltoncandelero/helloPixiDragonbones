const PACKAGE = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  output: { path: buildPath },
  module: { rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }] },
  devServer: { contentBase: 'build', port: 3000, hot: true },
  resolve: { extensions: ['.ts', '.js'] },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js' // makes dragonbones work
    }),
    new CopyWebpackPlugin([{ from: 'assets', to: '' }]),
    new HTMLWebpackPlugin(
      { template: 'assets/index.html', filename: 'index.html', templateParameters: { PACKAGE: PACKAGE, buildDate: new Date } })
  ]
}