import { ArrowParens, TrailingComma } from 'projen/lib/javascript';

const { cdktf, TextFile } = require('projen');
const versionFile = require('./version.json');

const cdktfVersion = '0.13.1';
const projenVersion = 'v0.65.0';
const constructsVersion = '10.1.139';
const nodejsVersion = 'v16.17.1';
const commonIgnore = ['.idea', '.Rproj', '.vscode', 'cdk.context.json', '.DS_Store', 'data/events/', 'poetry.lock'];

const project = new cdktf.ConstructLibraryCdktf({
  author: 'Bryan Galvin',
  authorAddress: 'bcgalvin@gmail.com',
  name: 'cdktf-modelbroker-eventbridge-schema',
  repositoryUrl: 'https://github.com/bcgalvin/cdktf-modelbroker-eventbridge-schema.git',
  defaultReleaseBranch: 'main',
  // Deps
  cdktfVersion: cdktfVersion,
  projenVersion: projenVersion,
  constructsVersion: constructsVersion,
  deps: ['@cdktf/provider-aws'],
  devDeps: [
    '@types/jest',
    '@types/node',
    '@cdktf/provider-aws',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'prettier',
    'cdktf-cli',
  ],
  // Docs, Testing & Linting
  docgen: true,
  docgenFilePath: 'docs/API.md',
  docsDirectory: 'docs',
  // Config
  projenrcTs: true,
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      trailingComma: TrailingComma.ALL,
      arrowParens: ArrowParens.ALWAYS,
      singleQuote: true,
    },
  },
  pullRequestTemplate: false,
  githubOptions: {
    pullRequestLint: false,
  },
  release: false,
  dependabot: false,
  autoMerge: false,
  catalog: { announce: false },
  // Ignore files
  gitignore: commonIgnore,
  npmignore: commonIgnore,
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});

project.package.addVersion(versionFile.version);
project.synth();
