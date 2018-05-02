#!/bin/bash -e

# Not enabling -x to hide the secrets

openssl aes-256-cbc -K $encrypted_66d875d20fac_key -iv $encrypted_66d875d20fac_iv -in secrets.tar.enc -out secrets.tar -d
tar xvf secrets.tar
rm secrets.tar
cp .transifexrc $HOME/.transifexrc
cp ngeo_deploy_key $HOME/.ssh/id_rsa
chmod 600 $HOME/.ssh/id_rsa
