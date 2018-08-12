import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import fileinclude from 'gulp-file-include';
import uglifycss from 'gulp-uglifycss';
import sourcemaps from 'gulp-sourcemaps';
import { create as bsCreate } from 'browser-sync';
const browserSync = bsCreate();

gulp.task('es6', () => {
    return gulp.src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('vendors', () => {
    return gulp.src('./src/js/vendors/*.js')
        .pipe(gulp.dest('./dist/js/vendors'))
})

gulp.task('img', () => {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('fonts', () => {
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./dist/fonts/'))
})


gulp.task('style', () => {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
})

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('fileinclude', () => {
    gulp.src(['./src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root'
        }))
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['browser-sync', 'es6','vendors', 'style','img','fonts', 'fileinclude'] , () => {
    gulp.watch('./src/sass/**/**.scss', ['style']);
    gulp.watch('./src/html/**.html', ['fileinclude']).on('change', browserSync.reload);
    gulp.watch('./src/html/**/**.html', ['fileinclude']).on('change', browserSync.reload);
    gulp.watch('./src/js/*.js', ['es6']).on('change', browserSync.reload);
});