#!/bin/sh

echo "hiding TS files"

mv data.js data
find src -name "*.ts" -exec bash -c 'mv "$1" "${1%.ts}".ts__' - '{}' \;
