/**
 * Created by zc1415926 on 2017/5/15.
 */
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var gulpUtil = require('gulp-util');
var webpack = require('webpack');
var electronConnect = require('electron-connect').server.create({path:'./build', logLevel: 0});

var config = {
    path: {
        htmlSrcPath: 'src/app/index.html',
        htmlDestDir: 'build/app/',
        jsxSrcDir: 'src/app/',
        jsxDestDir: 'build/app/'
    }
};

gulp.task('copy-files', function(){
    gulp.src('package.json')
        .pipe(gulp.dest('build'));
    gulp.src('src/main.js')
        .pipe(gulp.dest('build'));
    gulp.src('src/app/index.html')
        .pipe(gulp.dest('build/app'));
});

gulp.task('build-react', function(){
    gulp.src('src/app/**/*.jsx')
        .pipe(gulpWebpack(
            {
                output: {
                    filename: 'bundle.js',
                },
                module: {
                    loaders: [
                        {
                            loader: 'babel-loader',
                            query: {presets:['react', 'es2015']}
                        }]
                },plugins: [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                ]
            }
        ))
        .pipe(gulp.dest('build/app'));
});

gulp.task('copyHtml', function () {
    gulp.src(config.path.htmlSrcPath)
        .pipe(gulp.dest(config.path.htmlDestDir));
});

gulp.task('watchWithConnect', function(){
    electronConnect.start();

    gulp.watch('src/app' + '**/*.jsx', ['build-react']);
    gulp.watch('src/app/index.html', ['copyHtml']);
    gulp.watch('src/main.js', function () {
        gulp.src('src/main.js')
            .pipe(gulp.dest('build'));
    });

    gulp.watch('build/app' + '/**/*', function () {
        electronConnect.reload();
        gulpUtil.log('Electron reloaded');
    });
    gulp.watch('build/main.js', function () {
        electronConnect.restart();
        gulpUtil.log('Electron restarted');
    });

    //Cann't stop watch. Gulp is just running as a never ending process
});

// gulp.watch cann't watch new files,
// using Ctrl + R for reload manually.
gulp.task('default', ['copy-files', 'build-react', 'watchWithConnect']);