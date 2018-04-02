#!/bin/sh

echo -e "Preparing TypeScript (removing JavaScript)"

echo -e "\n> preparing 'data'"

rm -rf data.js
mv data.ts data

echo -e "\n> preparing 'src'"

find src -iname "*.js" ! -iname "root.js" -type f -exec ls -ls {} \;
find src -iname "*.js" ! -iname "root.js" -type f -exec rm -r {} \;

echo -e "\n> removing get-*"

rm get-*

echo -e "\n> preparing git for snapshot commit"

git add data data.js data.ts src
git status

echo -e "\n> finished (JavaScript removal)"

echo -e "REMEMBER TO NAME AND PUSH THE BRANCH CORRECTLY"
