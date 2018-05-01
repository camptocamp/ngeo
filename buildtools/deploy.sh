#!/bin/bash -ex

make .build/node_modules.timestamp
make .build/python-venv.timestamp

if [ "${JOB}" == publish-examples ]
then
    make examples-hosted-ngeo .build/examples-hosted/index.html \
        examples-hosted-gmf .build/examples-hosted/contribs/gmf/index.html
fi

if [ "${JOB}" == publish-apps-gmf ]
then
    make examples-hosted-apps
fi

if [ "${JOB}" == publish-api-docs ]
then
    make .build/apidoc
fi

GH_PAGES_DIRECTORY=".build/ngeo-${GITHUB_USERNAME}-gh-pages"
make $GH_PAGES_DIRECTORY

cd $GH_PAGES_DIRECTORY
git fetch ${GIT_REMOTE_NAME}
git merge --ff-only ${GIT_REMOTE_NAME}/gh-pages
git clean --force -d

cd -
.build/python-venv/bin/python buildtools/cleanup-ghpages.py ${GITHUB_USERNAME} $GH_PAGES_DIRECTORY


cd $GH_PAGES_DIRECTORY
git add -A
git commit -m 'Cleanup GitHub pages' || true
git push ${GIT_REMOTE_NAME} gh-pages
cd -

cd $GH_PAGES_DIRECTORY
git pull ${GIT_REMOTE_NAME} gh-pages
cd -


# Some actions started from the target directory
mkdir -p $GH_PAGES_DIRECTORY/${GIT_BRANCH}
cd $GH_PAGES_DIRECTORY/${GIT_BRANCH}
if [ "${JOB}" == publish-examples ]
then
    git rm --ignore-unmatch --quiet --force examples/*.js examples/*.html || true
    git rm --ignore-unmatch -r --quiet --force examples/data || true
    git rm --ignore-unmatch -r --quiet --force examples/fonts || true
    git rm --ignore-unmatch -r --quiet --force examples/lib || true
    git rm --ignore-unmatch -r --quiet --force examples/partials || true
    git rm --ignore-unmatch --quiet --force examples/contribs/gmf/*.js examples/contribs/gmf/*.html || true
fi
if [ "${JOB}" == publish-apps-gmf ]
then
    git rm --ignore-unmatch -r --quiet --force examples/lib || true
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/apps || true
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/build || true
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/fonts || true
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/cursors || true
fi
if [ "${JOB}" == publish-api-docs ]
then
    git rm --ignore-unmatch -r --quiet --force apidoc || true
fi
cd -


# Some actions started from the root directory
if [ "${JOB}" == publish-examples ]
then
    TARGET="$GH_PAGES_DIRECTORY/${GIT_BRANCH}/examples/"
    mkdir -p $TARGET
    cp -r .build/examples-hosted/* $TARGET
fi

if [ "${JOB}" == publish-apps-gmf ]
then
    TARGET="$GH_PAGES_DIRECTORY/${GIT_BRANCH}/examples/contribs/gmf/"
    mkdir -p $TARGET
    cp -r .build/examples-hosted/contribs/gmf/apps $TARGET
    cp -r .build/examples-hosted/contribs/gmf/build $TARGET
fi

if [ "${JOB}" == publish-api-docs ]
then
    cp -r .build/apidoc $GH_PAGES_DIRECTORY/${GIT_BRANCH}/
fi

cd $GH_PAGES_DIRECTORY/
git add -A
git status
git commit -m 'Update GitHub pages' || true
git push ${GIT_REMOTE_NAME} gh-pages
