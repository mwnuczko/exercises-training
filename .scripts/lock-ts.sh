#!/bin/sh

find src -name "*.ts" -exec bash -c 'mv "$1" "${1%.ts}".ts__' - '{}' \;
