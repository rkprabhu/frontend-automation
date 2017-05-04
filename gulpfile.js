"use strict";
var gulp = require('gulp'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        watch = require('gulp-watch'),
        plumber = require('gulp-plumber'), //https://www.npmjs.com/package/gulp-plumber
        autoprefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        uglifycss  = require('gulp-uglifycss'),
        pump = require('pump'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	imagemin = require('gulp-imagemin'),
	csscomb = require('gulp-csscomb'),
	sassLint = require('gulp-sass-lint'),
	browserSync = require('browser-sync').create(),
	livereload = require('gulp-livereload'), //https://www.npmjs.com/package/gulp-livereload
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	prettify = require('gulp-jsbeautifier'),
	git = require('gulp-git');


var sass_url = "skin/frontend/rwd/default/scss/custom/",
	css_url  = "skin/frontend/rwd/default/css/custom/",
	template_url = "app/design/frontend/rwd/default/template/",
	js_url     = "skin/frontend/rwd/default/js/custom/",
	optimize_css_url = "skin/frontend/rwd/default/css/dist/",
	optimize_js_url = "skin/frontend/rwd/default/js/dist/";


	// Static Server + watching scss/html files. Refere this https://browsersync.io/docs/gulp
	gulp.task("serve", function() {
		browserSync.init({
			proxy: "192.168.4.168/projects/workflow" //  Url is generated using this value
		});
		gulp.watch(template_url+"**/*.phtml").on("change", browserSync.reload);
		gulp.watch(sass_url+"**/*.scss",["styles","sass","concatCss","css"]).on("change", browserSync.reload);
		gulp.watch("skin/frontend/rwd/default/js/custom/**/*.js",["prettify","scripts","compress"]).on("change", browserSync.reload);
	});
  	
  	/*----------------- Sass compilation, Css minification, Auto Prefixer, Concatenation -------------------*/
  	//https://www.npmjs.com/package/gulp-sass
 	gulp.task("sass", function () { 
		return gulp.src(sass_url+"**/*.scss") 	// Src from where files are getting referred
		.pipe(sourcemaps.init()) 											// It initiates sourcemaps for each scss which is going to get convert into css
		.pipe(sass().on("error", sass.logError)) 								// It complies and converts sass files to css
		// need to install this as dependency https://www.npmjs.com/package/gulp-autoprefixer
		// need to install this as dependency https://www.npmjs.com/package/browserslist.
		// List of browserslist is defined in package.json
		.pipe(autoprefixer())													// The function is to add prefixes in css properties
		.pipe(sourcemaps.write("../../sourcemaps"))							// This generate "sourcemaps" and stores them in to folder where path is specified
		.pipe(gulp.dest(css_url))				// This generate "CSS" and stores them in to folder where path is specified
		//.pipe(livereload())													// This is used for live reloading purpose. It also requires livereload extension
		// .pipe(browserSync.stream());										// Compile sass into CSS & auto-inject into browsers
	});

 	//https://www.npmjs.com/package/gulp-concat-css
	gulp.task("concatCss", function () {
		return gulp.src(css_url+"**/*.css")
		.pipe(concatCss("bundle.css"))
		.pipe(gulp.dest(optimize_css_url));
	});

	//https://www.npmjs.com/package/gulp-uglifycss
	gulp.task("css", function () {
		gulp.src(css_url+"**/*.css")
		.pipe(uglifycss({
			"maxLineLen": 80,
			"uglyComments": true
		}))
		.pipe(gulp.dest(optimize_css_url));
	});

	/*----------------- Sass compilation, Css minification, Auto Prefixer, Concatenation -------------------*/
	/*----------------- Sass lint, css propery formation as per liniting -------------------*/

	//https://www.npmjs.com/package/gulp-csscomb
	gulp.task("styles", function() {
	  return gulp.src(sass_url+"**/*.scss")
	    .pipe(csscomb()) // comb can be modified here. node_modules/csscomb/config/csscomb.json
	    .pipe(gulp.dest(sass_url));
	});


	// https://www.npmjs.com/package/gulp-sass-lint
	gulp.task("sassLint", function () {
	  return gulp.src(sass_url+"unstocker/global.scss")
	    .pipe(sassLint())
	    .pipe(sassLint.format())
	    .pipe(sassLint.failOnError())
	});

	/*----------------- Sass lint, css propery formation as per liniting  -------------------*/
	/*----------------- js Beautifier, js linting, js concatenation, minification, merging all  -------------------*/ 	
 	//https://www.npmjs.com/package/gulp-jsbeautifier
	gulp.task("prettify", function() {
		gulp.src([ js_url+"**/*.js"])
		.pipe(prettify({
			js: {
				indent_level: 2
			}
		}))
		.pipe(gulp.dest(js_url+""));
	});
 	
 	//https://www.npmjs.com/package/gulp-jslint
	gulp.task("lint", function() {
	  return gulp.src(js_url+"translate_inline.js")
	    .pipe(jshint())
	    // need this plugin as dependency. Refer https://www.npmjs.com/package/jshint-stylish
	    .pipe(jshint.reporter("jshint-stylish"))
	});

	//https://www.npmjs.com/package/gulp-uglify
	gulp.task("compress",function(){
		//The pump module normalizes these problems and passes you the errors in a callback.
		//https://www.npmjs.com/package/pump
		pump([
			gulp.src(js_url+"**/*.js"),
			uglify(),
			gulp.dest(optimize_js_url)
		]);
	});

 	//https://www.npmjs.com/package/gulp-sourcemaps
	gulp.task("scripts", function() {
		return gulp.src(js_url+"**/*.js")
		.pipe(sourcemaps.init())												// It initiates sourcemaps for each scss which is going to get convert into css
		.pipe(concat("all.js"))
		.pipe(sourcemaps.write())											// This generate "sourcemaps" and stores them in to folder where path is specified
		.pipe(gulp.dest(optimize_js_url));
	});

	/*----------------- js Beautifier, js linting, js concatenation, minification, merging all into one file  -------------------*/ 	
 	/*----------------- Image Minification  -------------------*/ 	
 	//https://www.npmjs.com/package/gulp-imagemin
	gulp.task("imagemin", function(){
		return gulp.src("skin/frontend/rwd/default/images/custom/**/*")
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 10,
			svgoPlugins: [{removeViewBox: true}]
		}))
		.pipe(gulp.dest("skin/frontend/rwd/default/images/dist_images"))
	});

	/*----------------- Image Minification  -------------------*/ 		
	/*----------------- Task setup to initialize  -------------------*/ 
	// https://www.npmjs.com/package/gulp-watch
	gulp.task("watch", function(){
		// livereload.listen();
		// Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
		gulp.watch(template_url+"**/*.phtml").on("change", browserSync.reload);
		gulp.watch(sass_url+"**/*.scss",["styles","sass","concatCss","css"]).on("change", browserSync.reload);
		gulp.watch("skin/frontend/rwd/default/js/custom/**/*.js",["prettify","scripts","compress"]).on("change", browserSync.reload);
	});

	gulp.task("default", ["serve"]);
	// sassLint, lint, imagemin should be used independently
	/*----------------- Task setup to initialize  -------------------*/ 
	// browser-sync start --proxy="192.168.4.168/projects/workflow" --files "skin/frontend/rwd/default/css/custom/**/*.css"