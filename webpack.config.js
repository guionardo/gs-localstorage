const path = require('path');
const webpack = require('webpack');

const entryDir = path.resolve(__dirname, 'src');
const outputDir = path.resolve(__dirname, 'dist');

const config = {
  devtool: 'sourcemap',
  entry: `${entryDir}/index.js`,
  output: {
    path: outputDir,
    filename: 'localStorageDB.min.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: entryDir,
        loader: ['babel-loader']
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(__dirname, '.eslintrc')
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
};

module.exports = config;