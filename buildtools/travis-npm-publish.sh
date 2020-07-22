#!/bin/bash -e

echo "Trying to publish tag $TRAVIS_TAG from package $PACKAGE_VERSION on $TRAVIS_REPO_SLUG"

if [[ $@ =~ "--dry-run" ]]; then RUN="echo "; fi

if [ "$TRAVIS_REPO_SLUG" = "camptocamp/ngeo" ]
then
    if [ -n "$TRAVIS_TAG"  ]
    then
        echo "The tag $TRAVIS_TAG should be published to npm"
        if [[ $TRAVIS_TAG =~ ^[0-9]+\.[0-9]+\.[0-9]+-[a-z]+\.[0-9]+$ ]]
        then
            echo "This is a regular version (not a dev version)"
            export TAG="--tag version-$(echo $TRAVIS_TAG | awk -F[.-] '{print $4}')"
        else
            echo "This is not a regular version"
        fi
        if [ "$PACKAGE_VERSION" = "$TRAVIS_TAG" ]
        then
            $RUN npm publish --quiet --tag=version-${MAIN_BRANCH} $TAG
        else
            echo "Skipping publication, the travis tag and package version differ"
        fi
    else
        if [ "${TRAVIS_BRANCH}" = "${MAIN_BRANCH}" ]
        then
            echo "Publish daily version"
            $RUN npm install --no-save fluid-publish
            $RUN npm config set loglevel warn && node_modules/.bin/fluid-publish devTag="version-${MAIN_BRANCH}-latest"
        fi
    fi
fi
