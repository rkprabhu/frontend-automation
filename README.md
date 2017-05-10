# frontend-automation
Automate frontend using task runner gulp

Prerequisites:
- Knowledge of Node.js, Gulp Js
- Pre Installed Node and Gulp globally on local syatem

Installation Steps
- Download repositiory to your system. Extract it.
- Copy and paste files into the root directory of your project.
- Open "Node Terminal", Go to your project directory.
- To make this work type following commands into your "Node Terminal".
	1) Type "npm install" into terminal
		 As "package.json" is already present in root directory, Node will install all the dependencies required for automation
	2) Next step is type command "npm install gulp-cli -g" and "npm install gulp -D"
		 This will install gulp globally into system as well ass node will treat as a dependency for your project.

Now that installation is completed. Open "gulpfile.js". Do the necessity changes like changes folder path, arrangement of task as per the need.

List of tasks added into gulpfile.json are
- gulp : http://gulpjs.com/
- gulp-sass : https://www.npmjs.com/package/gulp-sass
- gulp-sourcemaps : https://www.npmjs.com/package/gulp-sourcemaps
- gulp-watch : https://www.npmjs.com/package/gulp-watch
- gulp-plumber : https://www.npmjs.com/package/gulp-plumber
- gulp-autoprefixer : https://www.npmjs.com/package/gulp-autoprefixer
- gulp-uglify : https://www.npmjs.com/package/gulp-uglify
- gulp-uglifycss : https://www.npmjs.com/package/gulp-uglifycss
- pump : https://www.npmjs.com/package/pump
- gulp-concat : https://www.npmjs.com/package/gulp-concat/
- gulp-concat-css : https://www.npmjs.com/package/gulp-concat-css
- gulp-imagemin : https://www.npmjs.com/package/gulp-imagemin
- gulp-csscomb : https://www.npmjs.com/package/gulp-csscomb
- gulp-sass-lint : https://www.npmjs.com/package/gulp-sass-lint
- browser-sync : https://browsersync.io/docs/gulp
- gulp-livereload : https://www.npmjs.com/package/gulp-livereload
- gulp-jshint : https://www.npmjs.com/package/gulp-jslint
- jshint-stylish : https://www.npmjs.com/package/jshint-stylish
- gulp-jsbeautifier : https://www.npmjs.com/package/gulp-jsbeautifier
- gulp-git : https://www.npmjs.com/package/gulp-git

Once this is done, you are ready to start automating frontend. 
In "node terminal", go to your project directory and type command "Gulp".
