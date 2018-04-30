#!/bin/bash -ex

make .build/node_modules.timestamp

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

make .build/ngeo-${GITHUB_USERNAME}-gh-pages

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

cd .build/ngeo-${GITHUB_USERNAME}-gh-pages
git pull ${GIT_REMOTE_NAME} gh-pages
cd -

mkdir -p .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}
cd .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}
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

if [ "${JOB}" == publish-examples ]
then
    mkdir -p .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/* .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/
    cp -r .build/examples-hosted/contribs/gmf/* .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
fi
if [ "${JOB}" == publish-apps-gmf ]
then
    mkdir -p .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/lib .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/
    cp -r .build/examples-hosted/contribs/gmf/apps .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/build .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/fonts .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
    cp -r .build/examples-hosted/contribs/gmf/cursors .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/examples/contribs/gmf/
fi
if [ "${JOB}" == publish-api-docs ]
then
    cp -r .build/apidoc .build/ngeo-${GITHUB_USERNAME}-gh-pages/${GIT_BRANCH}/
fi

cd .build/ngeo-${GITHUB_USERNAME}-gh-pages/
git add -A
git status
git commit -m 'Update GitHub pages' || true
git push ${GIT_REMOTE_NAME} gh-pages
