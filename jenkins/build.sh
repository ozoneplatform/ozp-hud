#!/usr/bin/env bash
# use the develop branch of ozp-react-commons
# sed -i -e "s/ozp-react-commons#master/ozp-react-commons#develop/g" package.json
source /usr/local/node_versions/set_node_version.sh 5.3.0
npm install
npm run build
npm run tarDistDate
