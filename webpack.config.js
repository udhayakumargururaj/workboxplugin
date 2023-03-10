const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const {GenerateSW} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const options = {
  fileName: 'manifest.json',
  basePath:''
}
module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }, 
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 9000,
  },
  plugins: [
    new WebpackManifestPlugin(options),
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/sw.js'
      }],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Welcome to Sample',
      template: './index.html',
      filename: './index.html',
      'meta': {
        'viewport': 'width=device-width, initial-scale=1.0',
        'charset': 'UTF-8'
      }
    }),
    new webpack.ProgressPlugin({ percentBy: "entries" }),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
    // new BundleAnalyzerPlugin()
  ]
};
