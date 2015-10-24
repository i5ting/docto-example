var gulp = require('gulp');
var gp_deploy = require('gulp-gh-pages');
var open = require("gulp-open");
var rename = require("gulp-rename");

var options = {}
gulp.task('deploy', function () {
  return gulp.src('./preview/**/*')
    .pipe(gp_deploy(options));
});

gulp.task('rename',function () {
  return gulp.src('./preview/README.html')
    .pipe(gulp.dest('./preview/index.html'));
});

gulp.task('copy_img',function () {
  return gulp.src('./img/**/*')
    .pipe(gulp.dest('./preview/img'));
});

// 使用i5ting_toc直接生成，不再使用shell
// copy img到preview下面
gulp.task('doc', ['copy_img'],function () {
  var is_open = true;
  var markd_config = {
  	debug: false
  }
  
  //函数可以返回当前正在执行的项目路径
  var pwd = process.cwd()  
  var source_file = "README.md"
  var source_file_name = pwd + '/' + source_file
  var file_name = source_file_name.split('/').pop();;
  var _file_name = file_name.split('.')[0];

  var dest_file_path = pwd + '/preview/' + _file_name + '.html';

  console.log('pwd=' + pwd);
  console.log('source_file_name=' + source_file_name);
  console.log('dest_file_path=' + dest_file_path);

  require('i5ting_toc')(pwd, source_file_name, dest_file_path, is_open, markd_config);
});

gulp.task('show',['doc'] ,function () {
  console.log('show');
});

gulp.task('default',['doc', 'rename', 'deploy'] ,function () {
  console.log('default');
});
