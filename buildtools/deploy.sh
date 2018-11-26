#!/bin/bash -ex

if [[ ${GIT_BRANCH} =~ "/" ]]
then
  echo "Skipping deploy of external branch ${GIT_BRANCH}"
  exit
fi

# Cloning gh-pages into a local temporary directory
TMP=".build/ngeo-${GITHUB_USERNAME}-gh-pages"
git clone --single-branch --branch gh-pages git@github.com:${GITHUB_USERNAME}/ngeo.git ${TMP}

# Cleanup unused
.build/python-venv/bin/python buildtools/cleanup-ghpages.py ${GITHUB_USERNAME} ${TMP}

pushd ${TMP}
git rm --ignore-unmatch -r --quiet --force ${GIT_BRANCH} || true
popd

mkdir -p ${TMP}/${GIT_BRANCH}/examples
cp -r .build/examples-hosted/* ${TMP}/${GIT_BRANCH}/examples/
cp -r apidoc ${TMP}/${GIT_BRANCH}/
cp -r api/dist ${TMP}/${GIT_BRANCH}/api

# Rewrite root commit and force push
pushd ${TMP}
FIRST_COMMIT=$(git log --format='%H' | tail -1)
git reset --quiet --mixed $FIRST_COMMIT
git add -A
git commit --quiet --amend --message="Update GitHub pages"
git push origin gh-pages -f
popd

# Cleanup
rm -rf ${TMP}
