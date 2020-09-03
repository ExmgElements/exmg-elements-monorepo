/* eslint-disable @typescript-eslint/no-var-requires */
const watch = require('gulp-watch');
const glob = require('glob');
const {exec} = require('child_process');

import * as File from 'vinyl';
import * as GulpClient from 'gulp';

/**
 * Render single file
 */
function renderSass(pathWithFileName: string, stopOnError: boolean, template: string | null, newFileSuffix = '.ts') {
  console.log(`-- sass render ${pathWithFileName} --- `);

  const output = pathWithFileName.replace(/\.(s)?css$/, newFileSuffix);
  const cmd = `exmg-cli-sass-render -s ${pathWithFileName || ''} -t ${template || ''} -o ${output || ''}`;

  exec(cmd, (err: any, stdout: any, stderr: any) => {
    !!err && console.error('Error', err);
    !!stderr && console.error('StdErr', stderr);
    !!stdout && console.log(stdout);
    if (stopOnError && (!!err || !!stderr)) {
      process.exit(1);
    }
  });
}

/**
 * Register gulp tasks
 * - render-styles - Find by files and render them - this command may be used in npm run build "gulp render-styles"
 * - watch-styles - watch files and render
 * @param {GulpClient.Gulp} gulp
 * @param {string} filesPattern - src/**\/*.{scss,css}
 * @param {string} template - path to template
 * @param {string} newFileSuffix - .css or .scss files will be replaced with given suffix default is .ts
 */
exports.registerTasks = (gulp: GulpClient.Gulp, filesPattern: string, template: string | null, newFileSuffix = '.ts') => {
  gulp.task('render-styles', (done: Function) => {
    glob.sync(filesPattern, {absolute: true}).forEach((path: string) => renderSass(path, true, template, newFileSuffix));

    done();
  });

  gulp.task('watch-styles', () => {
    return watch(filesPattern, {read: false, events: ['add', 'change'], ignoreInitial: false}, (file: File) => {
      renderSass(file.path, false, template, newFileSuffix);
    });
  });
};
