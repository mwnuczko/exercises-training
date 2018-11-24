#!/bin/sh

echo "uncovering TS files"

mv data data.js
find src -name "*.ts__" -exec bash -c 'mv "$1" "${1%.ts__}".ts' - '{}' \;
