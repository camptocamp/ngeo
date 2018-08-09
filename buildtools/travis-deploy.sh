#!/bin/bash -ex

if [ ${IS_HOME} = TRUE -a "${TRAVIS_BRANCH}" = "${MAIN_BRANCH}" ]; then make transifex-send; fi
if [ ${IS_HOME} = TRUE ]; then buildtools/deploy.sh; fi
node ./node_modules/coveralls/bin/coveralls.js < .build/coverage/lcov.info
buildtools/travis-npm-publish.sh
