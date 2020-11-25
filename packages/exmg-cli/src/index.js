/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This script is replacing all absolute paths generated inside /docs/**\/*.html
 */
const path = require('path');
const replace = require('replace');
const fs = require('fs');
const escapePattern = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const fixGenDocs = (projectDir, docsDir, apply = false, verbose = false) => {
    const isVerbose = !apply || verbose;
    const projectPath = path.join(process.cwd(), projectDir);
    const docsPath = path.join(projectPath, docsDir);
    const phraseToReplace = escapePattern(projectPath);
    if (!fs.existsSync(projectPath)) {
        throw new Error(`Directory "project-dir" ${projectPath} does not exists`);
    }
    if (!fs.existsSync(docsPath)) {
        throw new Error(`Directory "docs-dir" ${docsPath} does not exists`);
    }
    if (isVerbose) {
        console.log(`Files will be replaced in ${docsPath}/*.html`);
    }
    replace({
        regex: new RegExp(phraseToReplace, 'g'),
        replacement: '',
        paths: [docsPath],
        recursive: true,
        silent: !isVerbose,
        preview: !apply,
        include: '*.html',
        multiline: true,
    });
};
const doFixGenDocs = (projectDir, docsDir, dryRun = true, verbose = false) => new Promise(resolve => {
    fixGenDocs(projectDir, docsDir, dryRun, verbose);
    resolve(true);
});
exports.doFixGenDocs = doFixGenDocs;
export {};
