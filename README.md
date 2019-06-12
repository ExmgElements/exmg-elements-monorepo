# ExMachina Elements Monorepo

ExMachina's elements centralized in a monorepo

## INSTALLATION

You will need to install [lerna](https://github.com/lerna/lerna/) globally first

```bash
npm i -g lerna
```

Then simply install the project, and dependancies from packages

```bash
npm install && lerna run package-install
```

## DEVELOPMENT

For the moment packages are not sym-linked from one another because of `lit-element` ??.

### Run a specific package

```bash
lerna run start --scope @exmg/exmg-dialogs --stream
```

## COMMANDS

### NPM

- `npm run lerna:clean` - remove node_modules and package-lock.json from packages/\*

* `npm run clean` - remove node_modules from packages/\*

- `npm run ls` - show list of your packages

### LERNA

- `lerna run :script-name` - which is resolved to `npm run :script-name` and executed on all packages if `:script-name` is added to `package.json > scripts` of package

* `lerna exec :script-name` - You can use exec for running a shell command on all your packages, similar with run command, but you don’t need to define the script on all packages!

* `lerna exec --no-bail -- npm run lint` will execute ESLint in all packages, without exiting if a package as an error. Very handful to do a gloabl check before publish.

## PUBLISH

### PRODUCTION

```bash

##

lerna publish prerelease

lerna publish pathch

lerna publish minor

lerna publish major

```

It will increment version and commit and push to GIT then publish to npm

### DEVELOPMENT -- TODO --

For development you can use `sinopia` to setup private npm registry (follow [docs](https://github.com/rlidwka/sinopia))

```bash

npm i -g sinopia

## setup add users etc.



#run npm server

sinopia



npm set registry http://localhost:4873/ # this is default port



### it will push packages to your private repo

### It will not create git tags nor commits

### Lerna determine version base on git so if you run it second time you have to

### unpublish previous releases or change --preid to another uniq value

lerna publish prerelease --no-git-tag-version --no-push --preid=my-uniq-id

```
