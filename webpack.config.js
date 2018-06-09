/*!
 * ASP.NET MVC Loves React Webpack Configuration
 * Coded by Fauzan Azhiman
 */
'use strict';

var webpack = require('webpack');

module.exports = function (release) {
  return {
	context: __dirname,
    output: {
      path: __dirname + '/public/html/js/',
      filename: '[name].js'
    },
    cache: !release,
    devtool: false,
    entry: {
	  './bundle': './src/App.jsx',
    },

    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ] : [
      new webpack.HotModuleReplacementPlugin(),
    ],

    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
    },

    module: {
        rules: [
        {
          test: /\.css$/,
          use: [
             'style-loader',
             'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
              'style-loader',
              'css-loader',
              'less-loader' //???
          ]
        },
        {
          test: /\.gif/,
          loader: 'url-loader',
          options: {
              limit: 10000,
              mimetype: "image/gif"
          }
        },
        {
          test: /\.jpg/,
          loader: 'url-loader',
          options: {
              limit: 10000,
              mimetype: "image/jpg"
          }
        },
        {
          test: /\.png/,
          loader: 'url-loader',
          options: {
              limit: 10000,
              mimetype: "image/png"
          }
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
		  options:{
			  presets: ['react','env']
		  }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                }
            },
            'webpack-module-hot-accept'
          ]
        }
      ]
    }
  };
};
