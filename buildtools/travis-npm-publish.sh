#!/bin/bash -e

echo "Trying to publish tag $GITHUB_REF from package $PACKAGE_VERSION on $GITHUB_REPOSITORY"

for value in "$@"; do
    if [[ $value == "--dry-run" ]]; then RUN="echo "; fi
done

if [ "$GITHUB_REPOSITORY" = "camptocamp/ngeo" ]; then
    if [[ "$GITHUB_REF" =~ ^refs/tags/.* ]]; then
        echo "The tag $GITHUB_REF should be published to npm"
        if [[ $GITHUB_REF =~ ^refs/tags/([0-9]+\.[0-9]+\.[0-9]+-[a-z]+\.[0-9]+)$ ]]; then
            echo "This is a regular version (not a dev version)"
            for t in $(echo "${GITHUB_REF}" | tr '/' "\n"); do GITHUB_TAG=$t; done
            TAG="--tag version-$(echo "${GITHUB_TAG}" | awk -F[.-] '{print $4}')"
            export TAG
        else
            echo "This is not a regular version"
        fi
        if [ "refs/tags/$PACKAGE_VERSION" = "$GITHUB_REF" ]; then
            $RUN npm publish --quiet "--tag=version-${MAIN_BRANCH}" "${TAG}"
        else
            echo "Skipping publication, the travis tag and package version differ"
        fi
    else
        if [ "${GITHUB_REF}" = "refs/heads/${MAIN_BRANCH}" ]; then
            echo "Publish daily version"
            $RUN npm install --no-save fluid-publish
            $RUN npm config set loglevel warn && node_modules/.bin/fluid-publish devTag="version-${MAIN_BRANCH}-latest"
        fi
    fi
fi
