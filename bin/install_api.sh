#!/bin/bash

if [ "$1" == "help" ]
then
  docker run --rm -v "$(pwd):/local" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    openapitools/openapi-generator-cli help $2 $3 $4 $5
    exit 1
fi


if [ "$1" == "meta" ]
then
  docker run --rm -v "$(pwd):/local" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    openapitools/openapi-generator-cli meta $2 $3 $4 $5 $6 $7 $8 $9
    exit 1
fi



# Script used for generating APIs and Models used in the given API based on a open api specification
# Currently supporting only one BE project as a source of APIs and models
# BE route must be mentioned in the .env file
# Docker must be installed
# Docker is provided the current logged user
# as the container generates the files under root user (forcing us to use sudo on the removal of old generated files)

binPath=$(dirname "$0")

cd $binPath
cd ..
source .env

curl "${REACT_APP_BE_BASE_URL}${REACT_APP_BE_SWAGGER_EXTENSION}" -o ./bin/swagger.json
rm -rf ./src/api/generated

docker run --rm -v "$(pwd):/local" \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    openapitools/openapi-generator-cli generate \
    -i /local/bin/swagger.json \
    -g typescript-fetch \
    -o /local/src/api/generated \
#  Can pass generator props comma separated, no white space
#    --additional-properties=
