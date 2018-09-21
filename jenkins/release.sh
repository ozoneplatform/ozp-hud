#!/usr/bin/env bash
source /usr/local/node_versions/set_node_version.sh 5.3.0
npm install
npm run install
npm run build
npm run tarDistVersion
