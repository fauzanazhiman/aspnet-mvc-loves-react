/*!
 * Brixcube Community SDK v1.0
 * Coded by Fauzan Azhiman
 * using Node.js, React + Redux
 */
'use strict';

var webpack = require('webpack');

module.exports = function (release) {
  return {
	context: __dirname,
    output: {
      path: __dirname + '/src-php/public/js/',
      filename: '[name].js'
    },
    cache: !release,
    devtool: false,
    entry: {
      'vendor': [
        'react', 
        'react-dom', 
        'redux', 
        'react-redux',
        'react-router',  
        'react-router-dom',  
        'superagent', 
        'react-dropzone', 
        'sweetalert2', 
        'react-helmet',
        'sprout-data',
        'fecha',
        'moment',
        'react-datetime',
        'react-tinymce'
      ],
      //builder application      
      './builder': './src-js/builder/App.jsx',
      
      //client core application
      './client': './src-js/client/App.jsx',
      './client_loader': './src-js/client/_loader.js',

      //installer application
      './installer': './src-js/installer/App.jsx'
    },

    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "./vendor.js" }),
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "./vendor.js" })
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
