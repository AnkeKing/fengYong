var gulp = require('gulp');
//注册方法：
// var concat = require('gulp-concat');//引入的插件对应的方法
// var uglify = require('gulp-uglify');//压缩css
// var rename = require('gulp-rename');//重命名
var clean = require('gulp-clean');//清理目标文件夹，以保证每次打包时，都是最新的文件。
var cleanCSS=require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');//加兼容浏览器的前缀
var livereload=require('gulp-livereload');//实时刷新
// var sass = require('gulp-sass');//编译sass

// gulp.task('css', function () {
//     return gulp.src('static/css/*.css')//找到目标原文件，将数据读取到gulp的内存
//         .pipe(concat('build.css'))//临时合并文件  
//         .pipe(gulp.dest('dist/css/'));//输出文件到本地
// });


// gulp.task('modifyCss', function () {
//     return gulp.src('static/css/*.scss'),
//         clean()
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', 'Android >= 4.0'],
//             cascade: true, //是否美化属性值 默认：true 像这样：
//             //-webkit-transform: rotate(45deg);
//             //        transform: rotate(45deg);
//             remove: true //是否去掉不必要的前缀 默认：true
//         }))
//         .pipe(cleanCSS())//压缩文件
//         .pipe(gulp.dest('dist/css'))//输出文件到本地
//         .pipe(livereload())//实时刷新
// });
// gulp.task('watch',function(){
//     gulp.watch('static/css/*.scss',gulp.series('modifyCss'));
// })




