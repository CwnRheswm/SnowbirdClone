module.exports = function(grunt){
	//require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		locales: {
			src: "dev/",
			dest: "build/"
		},
		concat_css: {
			options: {

			},
			all: {
				src: ["dev/snowbird_main.css","dev/content/**/*.css","dev/components/**/*.css"],
				dest: "dev/snowbird.css"
			}
		},
		connect: {
			server: {
				options:{
					base: "build/",
					keepalive: false
				}
			},
			polyDev: {
				options: {
					base: "dev/",
					keepalive:true
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'dev/',
				src: 'snowbird.css',
				dest: 'build/',
				ext: '.min.css'
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
			files: ['gruntfile.js','dev/sb.js']
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
		uglify: {
			build: {
			options: {
					beautify: true
				},
				files: [{
					expand: true,
					cwd: 'dev/',
					src: '**/*.js',
					dest: 'build/',
					ext: '.min.js'
				}]
			}
		},
		watch: {
			livereload:{
				options: {
					livereload: true,
				},
				files: ['build/**/*']
			},
			concat: {
				files: ["dev/**/*.css"],
				tasks: ["concat_css:all"]
			},
			cssmin: {
				files: ['dev/snowbird.css'],
				tasks: ['cssmin:minify']
			},
			jade: {
				options: {
					livereload: false,
				},
				files: ["dev/**/*.jade"],
				tasks: ["jade:compile"],	
			},
			jshint:{
				files: ['<%= jshint.files %>'],
				tasks: ['jshint'],
			},
			uglify:{
				files: ['dev/**/*.js'],
				tasks: ['uglify:build']
			}
		}
	});

	
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('ugly','uglify:build');
	grunt.registerTask('min',['cssmin:minify']);
	grunt.registerTask('add',['concat_css']);
	grunt.registerTask('start',['connect:server']);
	grunt.registerTask('dev',['connect:server','watch']);
	grunt.registerTask('polyDev',['connect:polyDev'])
};