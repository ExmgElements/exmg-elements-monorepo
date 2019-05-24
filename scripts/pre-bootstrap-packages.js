const glob = require('glob');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const pattern = path.join(__dirname, 'packages/**!(node_modules)/package.json');
console.log('===========================================================');
console.log('==== Clear packages node_modules and package-lock.json ====');
console.log('==== It may takes some time ====');
console.log('===========================================================');

glob.sync(pattern, {absolute: true})
  .forEach((it, index) => {
    const sequence = index + 1;
    const dirPath = path.dirname(it);
    const packageName = path.basename(dirPath);
    const packageLockPath = path.join(dirPath, 'package-lock.json');
    const nodeModulesPath = path.join(dirPath, 'node_modules');

    if (fs.existsSync(packageLockPath)) {
      console.log(`Clear ${path.basename(packageLockPath)} of ${packageName}`);
      // fs.unlinkSync(packageLockPath)
    }
    if (fs.existsSync(nodeModulesPath)) {
      console.log(`Clear ${path.basename(nodeModulesPath)} of ${packageName}`);
      // rimraf.sync(nodeModulesPath);
    }
    console.log(`Done ${path.basename(dirPath)} (${sequence})`);
    console.log();
  });

console.log('===========================================================');
console.log('==== Done ====');
console.log('===========================================================');
