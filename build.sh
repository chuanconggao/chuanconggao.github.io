#! /usr/bin/env bash

pushd css > /dev/null

scss index.scss | yuicompressor --type css > index.min.css

popd > /dev/null

pushd js > /dev/null

uglifyjs index.js > index.min.js

popd > /dev/null
