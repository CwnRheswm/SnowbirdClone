module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {

			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true
				},
				files: [ {
					cwd: "views",
					src: "**/*.jade",
					dest: "build",
					expand: true,
					ext: ".html"
				} ]
			}
		},
		jshint: {
			files: ['gruntfile.js']
		},
		connect: {
			server: {
				options:{
					port: 1337,
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});

	grunt.registerTask('serve','connect:server');
	grunt.registerTask('compile','jade');
	grunt.registerTask('default',['jshint','jade:compile','connect']);
};