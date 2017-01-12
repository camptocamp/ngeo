#!/bin/bash -ex

make .build/ngeo-${GITHUB_USERNAME}-gh-pages \
    .build/python-venv/lib/python2.7/site-packages/requests \
    .build/python-venv/lib/python2.7/site-packages/urllib3

cd .build/ngeo-${GITHUB_USERNAME}-gh-pages
git fetch ${GIT_REMOTE_NAME}
git merge --ff-only ${GIT_REMOTE_NAME}/gh-pages
git clean --force -d

cd -
.build/python-venv/bin/python buildtools/cleanup-ghpages.py ${GITHUB_USERNAME} .build/ngeo-${GITHUB_USERNAME}-gh-pages


cd .build/ngeo-${GITHUB_USERNAME}-gh-pages
git add -A
git commit -m 'Cleanup GitHub pages' || true
git push ${GIT_REMOTE_NAME} gh-pages
cd -

if [ "${EXAMPLES_NGEO}" == TRUE ]
then
    make examples-hosted-ngeo .build/examples-hosted/index.html
fi
if [ "${EXAMPLES_GMF}" == TRUE ]
then
    make examples-hosted-gmf .build/examples-hosted/contribs/gmf/index.html
fi
if [ "${APPS_GMF}" == TRUE ]
then
    make examples-hosted-apps
fi
if [ "${API}" == TRUE ]
then
    make .build/apidoc
fi

cd .build/ngeo-${GITHUB_USERNAME}-gh-pages
git pull ${GIT_REMOTE_NAME} gh-pages
cd -

mkdir -p .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}
cd .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}
if [ "${EXAMPLES_NGEO}" == TRUE ]
then
    git rm --ignore-unmatch -r --quiet --force examples/*.js examples/*.html || true
    git rm --ignore-unmatch -r --quiet --force examples/data || true
    git rm --ignore-unmatch -r --quiet --force examples/fonts || true
    git rm --ignore-unmatch -r --quiet --force examples/lib || true
    git rm --ignore-unmatch -r --quiet --force examples/partials || true
fi
if [ "${EXAMPLES_GMF}" == TRUE ]
then
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/*.js examples/contribs/gmf/*.html || true
fi
if [ "${APPS_GMF}" == TRUE ]
then
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/apps || true
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/build || true
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/fonts || true
    git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/cursors || true
fi
if [ "${API}" == TRUE ]
then
    git rm --ignore-unmatch -r --quiet --force apidoc || true
fi
cd -

if [ "${EXAMPLES_NGEO}" == TRUE ]
then
    mkdir -p .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/
    cp -r .build/examples-hosted/* .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/
fi
if [ "${EXAMPLES_GMF}" == TRUE ]
then
    mkdir -p .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/* .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
fi
if [ "${APPS_GMF}" == TRUE ]
then
    mkdir -p .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/apps .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/build .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/fonts .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/cursors .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
fi
if [ "${API}" == TRUE ]
then
    cp -r .build/apidoc .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/
fi

cd .build/ngeo-${GITHUB_USERNAME}-gh-pages/
git add -A
git status
git commit -m 'Update GitHub pages' || true
git push ${GIT_REMOTE_NAME} gh-pages
