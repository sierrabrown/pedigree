const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = './webpack.config'

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	inline: true,
	historyApiFallback: true
}).listen(3000, '0.0.0.0', function(err, result) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at 0.0.0.0:3000');
});