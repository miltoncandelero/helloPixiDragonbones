const PACKAGE = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  entry: [
    //'webpack-dev-server/client?https://3000-d1eba775-6ecc-4b9a-a1c9-3f699d90050b.ws-eu01.gitpod.io',
    //'webpack/hot/only-dev-server',
    './src/index.ts'
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  output: { path: buildPath },
  module: { rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }] },
  devServer: { 
    contentBase: 'build', 
    port: 3000, 
    hot: true,
    //client: 'https://3000-d1eba775-6ecc-4b9a-a1c9-3f699d90050b.ws-eu01.gitpod.io',
    //host: 'https://3000-d1eba775-6ecc-4b9a-a1c9-3f699d90050b.ws-eu01.gitpod.io',
    disableHostCheck: true,
  },
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