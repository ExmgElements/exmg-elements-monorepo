const gulp = require('gulp');
const spawn = require('child_process').spawn;
const {registerTasks} = require('@exmg/exmg-cli/src/sass-render/gulp');

registerTasks(gulp, '{styles,demo}/**/*.{scss,css}', './node_modules/@exmg/exmg-cli/src/sass-render/sass-template.tpl', '.ts');


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
