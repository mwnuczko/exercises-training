#!/bin/sh

find src -name "*.js__" -exec bash -c 'mv "$1" "${1%.js__}".js' - '{}' \;
