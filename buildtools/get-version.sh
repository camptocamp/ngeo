#!/bin/bash

# Example:
# buildtools/get-version.sh angular
# buildtools/get-version.sh version

grep "\"$1\"" package.json | cut -d\" -f4
