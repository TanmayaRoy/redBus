const webpack = require('webpack');


const argv = require('minimist')(process.argv.slice(2));
const mode = argv.mode;
const context = argv.context;

if(!mode){
	console.log("Example command: node scripts/build.js --mode dev  --context redbus");
	console.log("Example command: node scripts/build.js --mode prod  --context bankweb/redbus/");
	console.log("Example command: node scripts/build.js --mode prod  --context bank/redbus/");
	console.log('********      *****     *******');
	return;
}

if(mode === 'dev'){
	const webpackDevServer = require('webpack-dev-server');
	let config = null;
	config = require('../src/script/webpack-dev.config.js')(mode,context);	
	webpackDevServer.addDevServerEntrypoints(config, config.devServer);
	const compiler = webpack(config);
	const server = new webpackDevServer(compiler, config.devServer);

	server.listen(5000, 'localhost', () => {
	  console.log('dev server listening on port 5000');
	});

}

if(mode === 'prod' || mode === 'qa' ){ //QA is same as prod

	let config = null;
	config = require('../src/script/webpack-prod.config.js')('production',context);

	const ProgressPlugin = require('webpack/lib/ProgressPlugin');
	const compiler = webpack(config);
	compiler.hooks.afterPlugins.call(new ProgressPlugin(function(percentage, msg, current, active, modulepath) {
	   if (process.stdout.isTTY && percentage < 1) {
        process.stdout.cursorTo(0)
        modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : ''
        current = current ? ' ' + current : ''
        active = active ? ' ' + active : ''
        process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + current + active + modulepath + ' ')
        process.stdout.clearLine(1)
      } else if (percentage === 1) {
        process.stdout.write('\n')
        console.log('webpack: done.')
      }
	}));

	compiler.run(function(err, stats) {
		if (err) throw err
	process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
	});

}

