var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config),{
	publicPath : config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	quiet: false,
	noInfo: false,
	stats:{
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: true
	}
}).listen(3000,'localhost',function(err){
	
	if(err)
	{
		console.log(err);
	}

	console.log('listening at localhost:3000');
})