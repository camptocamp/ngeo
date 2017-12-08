#!/bin/sh

# Any call to the goog library except the followings are forbidden
echo "Checking use of goog library..."
if grep --include '*.js' -Rn "goog\." src contribs examples | grep -E -v 'goog.provide|goog.require|goog.module|goog.asserts|goog.exportSymbol|goog.exportProperty'
then
  echo "Found forbidden uses."
  return 1
fi
