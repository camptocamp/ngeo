#!/bin/bash -ex

if [ ${IS_HOME} = TRUE -a "${TRAVIS_BRANCH}" = "${MAIN_BRANCH}" ]; then make transifex-send; fi
if [ ${IS_HOME} = TRUE ]; then buildtools/deploy.sh; fi
buildtools/travis-npm-publish.sh
