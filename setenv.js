/*
Sets environment-specific configuration
by copying over 'src/config/config.<environment_name>.ts' file to
'scr/config/config.ts'.
Note that 'scr/config/config.ts' is in .gitignore and should never be committed to Git repository.

*/
var fs = require('fs-extra');

//fs.removeSync('www');

var env = process.argv.toString().split(',')[2];
if (!env) {
	env = 'dev'; // default
}

if (env) {
	console.log('*** Environment: ', env);

	var conf = {
		src: `src/environments/environment.${env}.ts`,
		dest: `src/environments/environment.ts`
	};

	fs.readFile(conf.src, 'utf8', (err, data) => {
		if (err) throw err;
		//console.log(data);
		var timeStamp = (new Date()).toString(); //.toJSON();
		var newData = data.replace('{{buildTimestamp}}', timeStamp);
		//console.log('Build Timestamp:', timeStamp);

		fs.writeFile(conf.dest, newData, (err) => {
			if (err) throw err;
			console.log(`Active configuration: ${conf.src}`);
		});
	});

}

