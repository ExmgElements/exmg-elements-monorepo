# exmg-cli

* [gen-docs](#gen-docs)

  - [command options](#command-options-gen-docs)

  - [examples](#examples-gen-docs)

* [sass-render](#sass-render)

  - [command options](#command-options-sass-render)

  - [examples](#examples-sass-render)

  - [gulp](#gulp-sass-render)

## gen-docs
Main aim of this command is to remove absolute path which are included inside generated docs by library `typedoc`.

Command
`typedoc --out some/output/ .ts`

generate relative paths inside html files 

but when we change mask for input files to

`typedoc --out some/output/ src/**/*.ts`

then html will contains absolute paths, for instance

`/Users/your-nicknam/secret/path/to/workspace/repo/node_modules/*`

### Command options gen-docs
 
alias | option | type | description
------| ------ | ---- | ----------
  -p | --project-dir | string |   Path to the project
  -d | --docs-dir | string | Relative path to project-dir where
  -a |" --apply | boolean | If false then will print list of files which will be affected. If true then print and update files
  -h | --help | boolean | Print this message.
  -v | --verbose | boolean | Print useful information

### Examples gen-docs

* help

`node ./src/gen-docs/bin/gen-docs.js -h`

* Execute command in without applying changes. This command will only show which
files will be affected.

`node ./src/gen-docs/bin/gen-docs.js --project-dir ./ --docs-dir path/to/docs`

* Execute command and apply changes

`node ./src/gen-docs/bin/gen-docs.js --project-dir ./ --docs-dir path/to/docs --apply`

shorten version

`node ./src/gen-docs/bin/gen-docs.js ./ -d path/to/docs -a`

verbose

`node ./src/gen-docs/bin/gen-docs.js ./ -d path/to/docs -a -v`

## sass-render
Main aim is to process and generate files `*.css and *.scss` into *.ts 

### Command options sass-render

alias | option | type | description
------| ------ | ---- | ----------
  -s | --source | string | Template file to render sass into.
  -o | --output | string | Output file path
  -t | --template | string | Template file to use, must use `<% content %>` as delimiter 
  -h | --help | boolean | Print this message.

### Examples sass-render

Process single file

`node src/sass-render/bin/sass-render.js -s ./test.scss -t ./src/sass-render/sass-template.tpl -o ./test-css.ts`

on the output file `test-css.ts` looks:

```text
import {css} from 'lit-element';

export const style = css`a{color:red}`;
export default style;
```
Finally we can import to LitElement

```typescript
import {LitElement} from 'lit-element';
import style from './test-c';

class MyElement extends LitElement {
  static styles = [
    style
  ];
}
```

#### GULP sass-render
We can also want to watch on any *.scss files and process them
here is example how gulpfile may looks like:

```javascript

const gulp = require('gulp');
const {spawn} = require('child_process');
const {registerTasks} = require('./src/sass-render/gulp');

registerTasks('src/**/*.{scss,css}', './node_modules/src/sass-render/sass-template.tpl', '.ts');


gulp.task('serve', () => {
  const spawnOptions = {
    shell: true,
    stdio: 'inherit'
  };
  spawn('gulp', ['watch-styles'], spawnOptions);
  spawn('tsc', ['--watch'], spawnOptions);
});
```

For build process we can use:

```bash
  gulp render-styles
```
