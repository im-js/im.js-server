#!/bin/bash

# 应用名
APP_NAME="im-server"

# linux or darwin
SYSTEM=$(echo $(uname) | awk '{print tolower($0)}');

NODE_VERSION="v7.6.0"
NODE_DIR="./.node/"
NODE_TAR="node-${NODE_VERSION}-${SYSTEM}-x64.tar.gz"

function installNode() {
    # https://npm.taobao.org/mirrors/node/v7.6.0/node-v7.6.0-darwin-x64.tar.gz
    # https://npm.taobao.org/mirrors/node/v7.6.0/node-v7.6.0-linux-x64.tar.gz
    # download and unpack tar file
    mkdir -p ./.node/${NODE_VERSION}-${SYSTEM}
    wget -P ${NODE_DIR} https://npm.taobao.org/mirrors/node/${NODE_VERSION}/${NODE_TAR}
    tar --strip-components=1 -xvzf ${NODE_DIR}${NODE_TAR} -C ${NODE_DIR}${NODE_VERSION}-${SYSTEM}

    # Clean temp files
    rm -rf ${NODE_DIR}/${NODE_TAR}
}

function exportPath() {
    NODE_PATH="$(cd "${NODE_DIR}${NODE_VERSION}-${SYSTEM}/bin" && pwd)"
    export PATH=$NODE_PATH:$PATH;

    export PM2_HOME='./.pm2/';
}

function npmInstall() {
    exportPath;
    cd ../../;
    pwd;
    npm -v;
    npm install -d --registry=https://registry.npm.taobao.org;
}

function start() {
    if [ -z $1 ]; then
        echo '环境字段不能为空，{development|prepub|production}'
        exit 1
    fi

    exportPath;
    node -v
    export DEBUG=cloverx:*;
    ../../node_modules/.bin/pm2 start  ../index.js --name=${APP_NAME} -- --env=$1
}

function list() {
    exportPath;
    node -v
    ../../node_modules/.bin/pm2 list
}

function log() {
    exportPath;
    node -v
    ../../node_modules/.bin/pm2 log
}

function reload() {
    exportPath;
    node -v
    ../../node_modules/.bin/pm2 restart all
}

function clean() {
    exportPath;
    node -v
    ../../node_modules/.bin/pm2 stop all
    ../../node_modules/.bin/pm2 delete all
}

case "$1" in
    start)
        start $2
        ;;
    npm-install)
        npmInstall
        ;;
    install-node)
        installNode
        ;;
    list)
        list
        ;;
    log)
        log
        ;;
    reload)
        reload
        ;;

    clean)
        clean
        ;;
    *)
        echo 'Usage {start|npm-install|install-node}'
        exit 1
        ;;
esac
