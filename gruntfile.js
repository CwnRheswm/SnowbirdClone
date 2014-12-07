module.exports = function(grunt){
	//require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

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
			files: ['gruntfile.js','sb.js']
		},
		connect: {
			server: {
				options:{
					base: "build/"
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
				seperator: ';'
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
			livereload:{
				options: {
					livereload: true,
				},
				files: ['build/**/*']
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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('dev', ['connect','watch']);
};