const gulp = require('gulp'); //导入gulp第三方模块
//打包css模块
//gulp-cssmin 导入模块
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
//gulp-uglify 导入模块
const uglify = require('gulp-uglify');
//gulp-babel 还依赖 @babel/code  和 @babel.preset-env
//这个包将自动导入那两个包
const babel = require('gulp-babel');
//gulp-htmlmin
const htmlmin = require('gulp-htmlmin') 
//gulp-del
const del = require('del');
//gulp-webserver
const webserver = require('gulp-webserver')

const sass = require('gulp-sass')
//打包三人组
const cssHandler = () => {
    return gulp.src('./src/css/*.css')  //找到src/css下面的所有css文件
               //gulp-autoprefixer
               .pipe(autoprefixer()) //自动加前缀
               .pipe(cssmin()) //压缩css代码
               .pipe(gulp.dest('./dist/css')) //压缩好的css文件放在该目录下
}
const jsHandler = () => {
    return gulp.src('./src/js/*.js')
                      .pipe(babel({//es6  => es5
                        presets:['@babel/env']
                      }))
                      .pipe(uglify())//压缩不了es6,所以先用babel处理
                      .pipe(gulp.dest('./dist/js'))
}
const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')
                      .pipe(htmlmin({ //想压缩需在对象中设置
                            removeAttributeQuotes:true,//移除属性上的双引号
                            removeComments:true,//移除注释
                            collapseBooleanAttributes:true,//把布尔值为 true 的值简写
                            collapseWhitespace:true,//移除所有空格，变成一行代码
                            minifyCSS:true,//把页面里面的style标签里的 css 样式也去掉空格
                            minifyJS:true,//把script标签里的js代码压缩
                      }))
                      .pipe(gulp.dest('./dist/pages'))
}
//转移两人组
const imgHandler = () => {
    return gulp.src('./src/images/**')
                      .pipe(gulp.dest('./dist/images'))
}
const libHandler = () => {
    return gulp.src('./src/lib/**')
                      .pipe(gulp.dest('./dist/lib')) 
}

const delHandler = () => {
    return del(['./dist'])//删除这个文件夹
}
const serverHandler = () => {
    return gulp.src('./dist')//网站根目录
                      .pipe(webserver({
                        host: 'localhost',//域名
                        port: 8080,//端口
                        open: './pages/index.html',//默认打开的首页
                        livereload:true,//自动刷新,dist下面更新代码时刷新
                        proxies: [//代理配置
                            {
                                source: '/login',
                                target: 'http://localhost:80/login.php'
                            },
                            {
                                source: '/regi',
                                target: 'http://localhost:80/register.php'
                            }
                        ]
                      }))
}
const sassHandler = () => {
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
}
const watchHandler = () => {
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/lib/**',libHandler);
    gulp.watch('./src/sass/*.scss',sassHandler);
}
// module.exports.css = cssHandler; //导出，然后就可以执行gulp css指令
// module.exports.js = jsHandler;
// module.exports.html = htmlHandler;
// module.exports.img = imgHandler;
// module.exports.lib = libHandler;

//默认任务  命令行直接执行gulp
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,libHandler,sassHandler),
    serverHandler,
    watchHandler
)