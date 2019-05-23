const gulp = require('gulp');
const watch = require('gulp-watch');
const glob = require('glob');
const {spawn, exec} = require('child_process');

function renderSass (pathWithFileName, stopOnError = false) {
  console.log(`-- sass render ${pathWithFileName} --- `);

  const output = pathWithFileName.replace(/\.(s)?css$/, '.ts');
  const cmd = `node ./scripts/sass-render/bin/sass-render.js -s ${pathWithFileName} -t ./scripts/sass-render/sass-template.tpl -o ${output}`;

  exec(cmd, (err, stdout, stderr) => {
    !!err && console.error('Error', err);
    !!stderr && console.error('StdErr', stderr);
    !!stdout && console.log(stdout);
    if (stopOnError && (!!err || !!stderr)) {
      process.exit(1);
    }
  });
}

gulp.task('render-styles', (done) => {
  glob.sync('*.{scss,css}', {absolute: true})
      .forEach(path => renderSass(path, true));

  done();
});

gulp.task('watch-styles', () => {
  return watch(
      '*.{scss,css}',
      {read: false, events: ['add', 'change'], ignoreInitial: false},
      (vinyl) => {
        renderSass(vinyl.path, false);
      });
});

/**
 * Gulp task to run `tsc --watch` and `polymer serve` in parallel.
 */
gulp.task('serve', () => {
  const spawnOptions = {
    // `shell` option for Windows compatability. See:
    // https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
    shell: true,
    stdio: 'inherit'
  };
  spawn('gulp', ['watch-styles'], spawnOptions);
  spawn('tsc', ['--watch'], spawnOptions);
  spawn('polymer', ['serve'], spawnOptions);
});
