#!/usr/bin/env bash

yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'deploy' &&
git remote add origin git@gitee.com:sulimi/moneybookwebsite-react.git &&
git push -u -f origin master &&
cd -