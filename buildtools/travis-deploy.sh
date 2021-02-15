#!/bin/bash -ex

if [ "$GITHUB_REPOSITORY" == 'camptocamp/c2cgeoportal' ] && [ "${GITHUB_REF}" == "refs/heads/${MAIN_BRANCH}" ]; then
    make transifex-send
    buildtools/deploy.sh
fi
buildtools/travis-npm-publish.sh
