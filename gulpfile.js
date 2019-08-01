//把安装好的包引入进来
const gulp = require('gulp'); 
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

//制定任务和执行任务
// gulp.task('default',function(){
//     console.log('gulp')
// })
// gulp.task('hello',function(){
//     console.log('hello gulp')
// })

//制定一个任务：压缩html
gulp.task('html',function(){
    //gulp.src代表:取
    gulp.src('src/**/*.html')
        //gulp.pipe代表: 调用htmlmin()方法，做相应的处理
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS 
        }))
        //gulp.pipe代表: 利用gulp.dest()方法,传到dist目录里面
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})

//制定一个任务：压缩css
gulp.task('css',function(){
    gulp.src('src/css/**/*.scss')
        //先把sass编译成css，再压缩
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

//制定一个任务：压缩js
gulp.task('js',function(){
    gulp.src('src/js/**/*.js')
        //先把js的ES6转换为ES5，再压缩
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
})

//制定一个任务：开启服务器
gulp.task('server',function(){
    connect.server({
        //代码运行的根目录
        root: 'dist',
        port: 1906,
        livereload: true
    })
})

//制定一个任务：移动图片
gulp.task("imgs", function(){
    gulp.src('src/imgs/**/*')
        .pipe(gulp.dest('dist/imgs'))
})

//制定一个任务：移动libs
gulp.task("libs", function(){
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
})

//制定一个任务：watch，监听文件的变化 执行对应的任务
gulp.task('watch',function(){
    gulp.watch('src/**/*.html',['html'])
    gulp.watch('src/css/**/*.scss',['css'])
    gulp.watch('src/js/**/*.js',['js'])
})
gulp.task("default", ["html","css","js","server","imgs","libs","watch"])