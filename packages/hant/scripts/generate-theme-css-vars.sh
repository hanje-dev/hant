#!/bin/bash

basepath=$(dirname $0)
input=${1:-assets}

postcss \
  "$input" \
  --dir "/Users/hanje/frontend/zent-copy/dist" \
  --syntax postcss-scss \
  --use "/Users/hanje/frontend/zent-copy/packages/hant/plugins/postcss-plugin-theme-css-vars.js" \
  --no-map
