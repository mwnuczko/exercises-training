#!/bin/sh

find src -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".js__' - '{}' \;
mv src/root.js__ src/root.js
