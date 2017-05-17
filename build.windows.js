/**
 * Created by zc1415926 on 2017/5/17.
 */
let Q = require('q');
let gulpUtil = require('gulp-util');
let jetpack = require('fs-jetpack');

let releaseDir;
let projectDir;

function init() {
    gulpUtil.log('this is ' + gulpUtil.colors.red('init') + ' function');

    projectDir = jetpack;
    releaseDir = projectDir.dir('./release', {empty: true});

    return Q();
}

function copyElectron() {
    gulpUtil.log('this is ' + gulpUtil.colors.red('copyElectron') + ' function');

    projectDir.copyAsync('./node_modules/electron/dist', releaseDir.path(), {overwrite: true});
    gulpUtil.log(releaseDir.path());
}

function build() {
    return init()
        .then(copyElectron);
}

module.exports = {build: build};