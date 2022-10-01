#!/bin/bash

set -e

basepath=$(dirname $0)

echo "Generate css variables reference..."
$basepath/./generate-theme-css-vars.sh

#clean
echo "Clean up style output..."
rm -rf css


# transpile scss to css
# custom importer for @import '~some-node-module'
echo "Compile styles..."
node $basepath/./compile-style.js

# autoprefixer, put it at last
postcss \
  css \
  --use "/Users/hanje/frontend/zent-copy/packages/hant/plugins/postcss-plugin-constants.js" \
  --use "/Users/hanje/frontend/zent-copy/packages/hant/plugins/postcss-plugin-version-attribute.js" \
  --use autoprefixer \
  --replace \
  --no-map

# minify index.css
postcss css/index.css --use cssnano --no-map -o css/index.min.css
