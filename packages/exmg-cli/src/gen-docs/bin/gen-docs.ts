#!/usr/bin/env node

import {Section} from 'command-line-usage';
import {OptionDefinition} from 'command-line-args';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const {doFixGenDocs} = require('../index');

interface ExtendedOptionDefinition extends OptionDefinition {
  description: string;
}

interface ScriptArguments {
  projectDir: boolean;
  docsDir: string;
  apply: boolean;
  help: boolean;
  verbose: boolean;
}

const options: ExtendedOptionDefinition[] = [
  {
    name: 'project-dir',
    alias: 'p',
    type: String,
    description: 'Path to the project',
    defaultOption: true,
    defaultValue: '',
  },
  {
    name: 'docs-dir',
    alias: 'd',
    type: String,
    description: 'Relative path to project-dir where ',
  },
  {
    name: 'apply',
    alias: 'a',
    type: Boolean,
    description: 'If false then will print list of files which will be affected. If true then print and update files',
    defaultValue: false,
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Print this message.',
  },
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    description: 'Print useful information',
  },
];

const {projectDir, docsDir, apply, help, verbose}: ScriptArguments = commandLineArgs(options, {camelCase: true});

function printUsage() {
  const sections: Section[] = [
    {
      header: 'gen-docs',
      content: 'Replace all absolute paths from "project-dir/docs-dir/*.html"',
    },
    {
      header: 'Options',
      optionList: options,
    },
  ];
  console.log(commandLineUsage(sections));
}

if (help) {
  printUsage();
  process.exit(0);
}

if (!(projectDir && docsDir)) {
  console.error('Must provide a project-dir and docs-dir!');
  printUsage();
  process.exit(-1);
}

if (verbose || !apply) {
  console.log('ARGUMENTS:');
  const inputOptions = {projectDir, docsDir, apply, help, verbose};
  console.log(JSON.stringify(inputOptions, (_, v) => (typeof v === 'undefined' ? null : v), 2));
}

doFixGenDocs(projectDir, docsDir, apply, verbose).catch((err: any) => {
  console.error(err);
  process.exit(-1);
});
