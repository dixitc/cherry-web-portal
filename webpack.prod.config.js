var path = require('path');
var webpack = require('webpack');
var WebpackStripLoader = require('strip-loader');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
	  	noParse: ['/node_modules/google-libphonenumber/dist/*'],
		loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loaders: ['react-hot', 'babel'],
					include: path.join(__dirname, 'src')
				},  {
					test: /\.(png|jpg)$/,
					loader: 'url-loader?limit=8192',
					include: path.join(__dirname, 'src/images')
				}, {
					test: /\.css$/,
					loaders: ['style', 'css'],
					include: path.join(__dirname, 'src')
			}
		]
  }
};
