#!/bin/bash

GIT_TAG=$(git describe --abbrev=0 --tags)

$(cd demo && npm install -f vue3-notion@latest)

git add --all
git commit -m 'Update demo'
git push --tags

gh release create $GIT_TAG -t "$GIT_TAG"