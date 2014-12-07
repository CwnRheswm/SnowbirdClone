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
				files: [{
					cwd: "dev",
					src: ["**/*.jade"],
					dest: "build",
					expand: true,
					ext: ".html"
				}]
			}
		},
		jshint: {
			options: {
				force: true
			},
			files: ['gruntfile.js','sb.js']
		},
		connect: {
			server: {
				options:{
					port: 1337,
				}
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: "dev/",
					src: ["**/*.scss"],
					dest: "dev/SASSbuild/",
					ext: ".css",
					flatten: true
				}]
			}
		},
		concat: {
			options: {
				seperator: ';',
			},
			dist: {
				files: [{
					expand: true,
					cwd: "dev/SASSbuild/",
					src: ["*.css"],
					dest: "build/snowbird.css"
				}],
			}
		},
		watch: {
			jshint: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint']
			},
			jade: {
				files: "dev/**/*.jade",
				tasks: "jade"
			},
			connect: {
				tasks: "connect"
			},
			options: {
				livereload: true
			}
		}
	});

	grunt.registerTask('serve','connect:server');
	grunt.registerTask('lint','jshint');
	grunt.registerTask('compile','jade');
	grunt.registerTask('add','concat');
	grunt.registerTask('default','watch');
};