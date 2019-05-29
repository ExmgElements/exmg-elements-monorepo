# exmg-elements-monorepo

## INSTALLATION

```bash
npm install

## lerna might be also installed globally
npm i -g lerna

## this command remove node_modules and package-lock.json from packages/* and do execute lerna bootstrap
npm run lerna:clean:bootstrap

## make sure to build all styles before using
lerna run build-styles

## Run a individual package including stream option for output
lerna run start --scope  @exmg/exmg-dialogs --stream 
```

## COMMANDS
### NPM
- `npm run lerna:clean:bootstrap` - remove node_modules and package-lock.json from packages/*
and install dependencies of all packages

- `npm run clean` - remove node_modules from packages/*

- `npm run bootstrap` - install package/* dependencies and linking packages

- `npm run ls` - show list of your packages

### LERNA

- `lerna run :script-name` - which is resolved to `npm run :script-name` and executed on all packages if `:script-name` is added 
to `package.json > scripts` of package

- `lerna exec :script-name` - You can use exec for running a shell command on all your packages, similar with run command, but you don’t need to define the script on all packages!
 As you see in the script snippet above, we can install rimraf on the root, and define the `"clean:lock": "lerna exec rimraf package-lock.json"` command
 and it’ll run on all the packages.

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

### DEVELOPMENT 
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
