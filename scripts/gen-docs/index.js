/**
 * This script is replacing all absolute paths generated inside /docs/**\/*.html
 */

const path = require('path');
const replace = require('replace');
const fs = require('fs');

const fixGenDocs = (projectDir, docsDir, apply = false, verbose = false) => {
  const projectPath = path.join(__dirname, projectDir);

  const docsPath = path.join(projectPath, docsDir);

  const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const phraseToReplace = escapePattern(projectPath);

  if (!fs.existsSync(projectPath)) {
    throw new Error(`Directory "project-dir" ${projectPath} does not exists`);
  }

  if (!fs.existsSync(docsPath)) {
    throw new Error(`Directory "docs-dir" ${docsPath} does not exists`);
  }

  replace({
    regex: new RegExp(phraseToReplace, 'g'),
    replacement: '',
    paths: [docsPath],
    recursive: true,
    silent: apply && !verbose,
    preview: !apply,
    include: '*.html',
    multiline: true,
  });
};

exports.fixGenDocs = (projectDir, docsDir, dryRun = true, verbose = false) => new Promise(resolve => {
  fixGenDocs(projectDir, docsDir, dryRun, verbose);
  resolve(true);
});
