#!/bin/bash -ex


# Cloning gh-pages into a local temporary directory
TMP=".build/ngeo-${GITHUB_USERNAME}-gh-pages"
git clone --single-branch gh-pages $(GIT_REMOTE_URL) $TMP


# Cleanup unused
.build/python-venv/bin/python buildtools/cleanup-ghpages.py ${GITHUB_USERNAME} $TMP


# Some actions started from the target directory
mkdir -p $TMP/${GIT_BRANCH}
cd $TMP/${GIT_BRANCH}
# publish-examples
git rm --ignore-unmatch --quiet --force examples/*.js examples/*.html || true
git rm --ignore-unmatch -r --quiet --force examples/data || true
git rm --ignore-unmatch -r --quiet --force examples/fonts || true
git rm --ignore-unmatch -r --quiet --force examples/lib || true
git rm --ignore-unmatch -r --quiet --force examples/partials || true
git rm --ignore-unmatch --quiet --force examples/contribs/gmf/*.js examples/contribs/gmf/*.html || true
# publish-apps-gmf
git rm --ignore-unmatch -r --quiet --force examples/lib || true
git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/apps || true
git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/build || true
git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/fonts || true
git rm --ignore-unmatch -r --quiet --force examples/contribs/gmf/cursors || true
# publish-api-docs
git rm --ignore-unmatch -r --quiet --force apidoc || true
cd -


# Some actions started from the root directory
# publish-examples
TARGET="$TMP/${GIT_BRANCH}/examples/"
mkdir -p $TARGET
cp -r .build/examples-hosted/* $TARGET
# publish-apps-gmf
TARGET="$TMP/${GIT_BRANCH}/examples/contribs/gmf/"
mkdir -p $TARGET
cp -r .build/examples-hosted/contribs/gmf/apps $TARGET
cp -r .build/examples-hosted/contribs/gmf/build $TARGET
# publish-api-docs
cp -r .build/apidoc $TMP/${GIT_BRANCH}/

# Cleanup the git tree by creating a single commit with all content
cd $TMP
git add -A
git status
FIRST_COMMIT=`git log --format='%H' | tail -1`
git reset --mixed $FIRST_COMMIT
git commit -a -m 'Latest GitHub pages'
git push ${GIT_REMOTE_NAME} gh-pages -f

# Cleanup
rm -rf $TMP
