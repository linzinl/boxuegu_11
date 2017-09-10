/* 导入各种包 */
var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var concat = require("gulp-concat");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var htmlReplace = require('gulp-html-replace');

/* html处理 */
gulp.task("html", function() {
    gulp.src(["./src/**/*.html", "index.html"])
        /* 用gulp-html-replace插件实现重复的html代码重复利用 */
        .pipe(htmlReplace({
            style: gulp.src('src/html/common/style.html'),
            aside: gulp.src('src/html/common/aside.html'),
            header: gulp.src('src/html/common/header.html')
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest("dist"));
});

/* less处理 */
gulp.task("less", function() {
    gulp.src("src/less/index.less")
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest("dist/css"));
});

/* 配置要打包的第三包路径 */
var jsLibs = [
    "./node_modules/art-template/lib/template-web.js",
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/bootstrap/dist/js/bootstrap.js",
    "./node_modules/jquery-form/dist/jquery.form.min.js"
];
/* 合并所有的第三方包成一个js */
gulp.task("jsLib", function() {
    gulp.src(jsLibs)
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("dist/js"));
});

/* 如下每个js都要打包 */
var jsModules = [
    //首页
    "src/js/index.js",
    //用户
    "src/js/user/login.js",
    "src/js/user/profile.js",
    "src/js/user/repass.js",
    //讲师
    "src/js/teacher/add.js",
    "src/js/teacher/edit.js",
    "src/js/teacher/list.js",
    //课程
    "src/js/course/add.js",
    "src/js/course//course_edit_step1.js",
    "src/js/course/course_edit_step2.js",
    "src/js/course/course_edit_step3.js",
    "src/js/course/list.js",
    //学科分类
    "src/js/category/add.js",
    "src/js/category/edit.js",
    "src/js/category/list.js"
    /*     //公共
        "src/js/common/aside.js",
        "src/js/common/header.js" */
]

/* 打包commonjs模块 未循环遍历前 */
/* gulp.task('js', function() {
  browserify('src/js/index.js').bundle() // 打包index.js
      .pipe(source('index.js'))
      .pipe(buffer())
      // .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
}); */

gulp.task("js", function() {
    jsModules.forEach(function(jsPath) { //jsPath代表jsModules中的每个值
        var pathArr = jsPath.split("/"); //将js路径通过"/"分割成数组
        var jsName = pathArr.pop(); //取出数组中的最后一个值,并且数组也会去掉该值
        pathArr.shift(); //取出数组中的第一个值,并且数组也会去掉该值
        browserify(jsPath).bundle() //打包各个js
            .pipe(source(jsName)) //传入数组中的最后一个值
            .pipe(buffer())
            // .pipe(uglify())
            .pipe(gulp.dest("dist/" + pathArr.join("/"))); //将得到的最终数组用'/'拼接
    });
});

/* 添加统一打包的任务 */
gulp.task("build", function() {
    gulp.run(["html", "less", "jsLib", "js"]);
});
/* 监听文件变化,自动打包 */
gulp.task("default", function() {
    gulp.run("build");
    gulp.watch(["./src/**/*.html", "index.html"], function() {
        gulp.run("html");
    });
    gulp.watch("src/less/index.less", function() {
        gulp.run("less");
    });
    gulp.watch(jsLibs, function() {
        gulp.run("jsLib");
    });
    gulp.watch(jsModules, function() {
        gulp.run("js");
    });
});