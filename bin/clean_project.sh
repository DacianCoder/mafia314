#!/bin/bash

# Script used for removal of certain features added by default

# Supported feature removal:
#   - Open API Generator by using `open-api` as an argument
#   - Final form by using `final-form`
#   - Gitlab ci by using `gitlab-ci`
#   - Stryker Mutation by using `mutation`(!Important: do not modify the initial gitlab-ci as this script deletes lines based on basic config)
#   - Cypress E2E testing by using `cypress` (same case as for Stryker)

removeOpenApi () {
  rm ./bin/install_api.sh
  rm ./src/api/configureApi.ts
  rm -rf ./src/api/generated
  sed -i '/declare type GlobalFetch = WindowOrWorkerGlobalScope/d' src/react-app-env.d.ts
  sed -i 's/## Open API Tools generator/## REMOVED ~~Open API Tools generator~~/g' README.md
}

removeFinalForm () {
  rm -rf ./src/form/final-form
  rm ./src/pages/FinalFormExample.tsx
  sed -i '/final-form/d' ./package.json
  sed -i '/to="final-form"/d' ./src/components/Navbar.tsx
  sed -i '/FinalFormExample/d' src/App.tsx
  sed -i 's/### Final Form/### REMOVED ~~Final Form~~/g' README.md
}

removeGitlabCi () {
  rm -rf .gitlab-ci.yml
}

getLineInGitlabCI(){
  echo "$(grep -n $1 .gitlab-ci.yml | cut -d : -f1)"
}

removeStrykerMutation () {
  rm -rf stryker.conf.js
  sed -i '/@stryker/d' ./package.json
  sed -i '/stryker run/d' ./package.json
  sed -i 's/### Mutation testing/### REMOVED ~~Mutation testing~~/g' README.md
  sed -i "$(getLineInGitlabCI 'mutations'),$(getLineInGitlabCI '{CI_COMMIT_REF_NAME}')d" .gitlab-ci.yml

}

removeCypress (){
  rm -f cypress.json
  rm -rf ./cypress
  sed -i '/start-server-and-test/d' ./package.json
  sed -i '/cypress/d' ./package.json
  sed -i 's/### E2E/### REMOVED ~~E2E~~/g' README.md
  sed -i "$(getLineInGitlabCI 'E2E'),$(getLineInGitlabCI 'test:e2e:ci')d" .gitlab-ci.yml
  sed -i "$(($(wc -l < './src/index.tsx')-2)),\$d" ./src/index.tsx
}

binPath=$(dirname "$0")
cd "$binPath/.."

for var in "$@"
do
  case $var in
    "open-api")
      removeOpenApi
    ;;
    "final-form")
      removeFinalForm
    ;;
     "gitlab-ci")
      removeGitlabCi
    ;;
    "mutation")
      removeStrykerMutation
    ;;
    "cypress")
      removeCypress
    ;;
    *)
      echo "$var is not supported"
    ;;
esac
done