const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpsync = require('gulp-sync')(gulp);
const rename = require('gulp-rename');
const gulpless = require('gulp-less');
const stripJsonComments = require('gulp-strip-json-comments');
const filter = require('gulp-filter');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const through = require('through2');
// const uglify = require('gulp-uglify');

const exec = require('child_process').exec;
const SRC_PATH = 'source';
const DIST_PATH = 'dist';

const logStream = function (text) {
    return through.obj(function (file, env, callback) {
        gutil.log(gutil.colors.green(file.relative) + ' ' + text);
        callback(null, file);
    });
};

const deleteFolderRecursive = function (path) {
    if (!path || path !== './' + DIST_PATH) {
        return;
    } else {
        exec('rm -r ' + path);
    }
};

const TaskHandle = {
    js(filePath, distPath) {
        const ALL_PATH = SRC_PATH + '/**/*.js';
        const gulpPath = filePath || ALL_PATH;
        const gulpDist = distPath || DIST_PATH;
        return gulp.src(gulpPath)
            .pipe(plumber())
            .pipe(logStream('task start'))
            .pipe(babel({
                presets: ['es2015'],
                plugins: [
                    'add-module-exports',
                ]
            }))
            .pipe(logStream('task end'))
            .pipe(gulp.dest(gulpDist)); 
    },
    less(filePath, distPath) {
        const ALL_PATH = [SRC_PATH + '/**/*.less', '!' + SRC_PATH + '/component/**/*.less'];
        const gulpPath = filePath || ALL_PATH;
        const gulpDist = distPath || DIST_PATH;
        return gulp.src(gulpPath)
            .pipe(plumber())
            .pipe(filter(['**', '!**/_*.less']))
            .pipe(logStream('编译开始'))
            .pipe(gulpless())
            .pipe(rename(function (path) {
                path.dirname += "/";
                path.extname = ".wxss";
            }))
            .pipe(logStream('编译结束'))
            .pipe(gulp.dest(gulpDist));
    },
    json(filePath, distPath) {
        const ALL_PATH = SRC_PATH + '/**/*.json';
        const gulpPath = filePath || ALL_PATH;
        const gulpDist = distPath || DIST_PATH;
        return gulp.src(gulpPath)
            .pipe(plumber())
            .pipe(stripJsonComments())
            .pipe(gulp.dest(gulpDist));
    },
    other(filePath, distPath) {
        const ALL_PATH = [SRC_PATH + '/**/*.wxml', SRC_PATH + '/**/*.png', SRC_PATH + '/**/*.jpg', SRC_PATH + '/**/*.jpeg'];
        const gulpPath = filePath || ALL_PATH;
        const gulpDist = distPath || DIST_PATH;
        return gulp.src(gulpPath)
            .pipe(gulp.dest(gulpDist));
    }
};

gulp.task('remove', function () {
    deleteFolderRecursive('./' + DIST_PATH, function () {
        gutil.log(gutil.colors.red('Remove ok'));
    });
});

gulp.task('js', function () {
    return  TaskHandle.js();
});

gulp.task('less', function () {
    return TaskHandle.less();
});

gulp.task('json', function () {
    return TaskHandle.json();
});

gulp.task('other', function () {
    return TaskHandle.other();
});

gulp.task('dev', gulpsync.sync(['remove', 'js', 'less' ,'json', 'other']), function () {
    gutil.log(gutil.colors.yellow('dev start'));
});

gulp.task('default', ['dev'], function () {
    gulp.watch(SRC_PATH + '/**').on('change', function (file) {
        const filePath = file.path;
        const extname = path.extname(filePath);
        const distPath = path.dirname(filePath).replace(new RegExp('^' + __dirname + '/'), '').replace(new RegExp(SRC_PATH), DIST_PATH);
    
        if (extname === '.js') {
            TaskHandle.js(filePath, distPath);
        } else if (extname === '.less') {
            TaskHandle.less(filePath, distPath);
        } 
        else if (extname === '.json') {
            TaskHandle.json(filePath, distPath);
        } else if (extname === '.wxml' || extname === '.png' || extname === '.jpg') {
            TaskHandle.other(filePath, distPath);
        }
    });
});

gulp.task('all', gulpsync.sync(['remove', 'js', 'less', 'json', 'other']), function () {
    gutil.log(gutil.colors.yellow('All done'));
});