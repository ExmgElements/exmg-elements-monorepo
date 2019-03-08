/**
 * This script is replacing all absolute paths generated inside /docs/**\/*.html
 */

const path = require('path');
const replace = require('replace');

const projectDir = path.join(__dirname, '../..');
const docsDir = path.join(projectDir, 'docs');

const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const phraseToReplace = escapePattern(projectDir);

replace({
  regex: new RegExp(phraseToReplace, 'g'),
  replacement: '',
  paths: [docsDir],
  recursive: true,
  silent: false,
  preview: false,
  include: '*.html',
  multiline: true,
});
