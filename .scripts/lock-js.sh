#!/bin/sh

echo "hiding JS files"

mv data.ts data
find src -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".js__' - '{}' \;
mv src/root.js__ src/root.js # this one has to stay :)
