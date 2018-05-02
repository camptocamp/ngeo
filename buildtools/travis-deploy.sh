#!/bin/bash -ex

if [ ${IS_HOME} = TRUE -a "${TRAVIS_BRANCH}" = "master" ]; then make transifex-send; fi
if [ ${IS_HOME} = TRUE ]; then buildtools/deploy.sh; fi
cat .build/coverage/lcov.info | node ./node_modules/coveralls/bin/coveralls.js
buildtools/travis-npm-publish.sh
