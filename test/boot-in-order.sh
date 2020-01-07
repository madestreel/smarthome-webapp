#!/bin/bash -
#===============================================================================
#
#          FILE: boot-in-order.sh
#
#         USAGE: ./boot-in-order.sh
#
#   DESCRIPTION:
#     Waits until the deamon of CouchDB starts to create a database. The
#     environment variable DB_URL contains more details of such DB
#     (name, authentication information of administrator, etc).
#       OPTIONS: ---
#  REQUIREMENTS: This script makes use of the environment variables DB_NAME, DB_URL and
#     SERVICE_NAME, be sure that such variables were defined before running this script.
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Maxime de Streel, maximedestreel@gmail.com
#  ORGANIZATION:
#       CREATED: 02/01/2020
#      REVISION:  ---
#===============================================================================
echo "Launching ${SERVICE_NAME} service"
until curl -s --request PUT "${DB_URL}" -o /dev/null; do
  sleep 2
done

if [ -d test-jsons ]; then
  cd test-jsons || exit
  source fill_db.sh "${DB_URL}"
  cd ..
fi

if [ -d views ]; then
  mkdir formatter_output
  DEBUG=views* node func_to_string.js
  if [[ ${?} != 0 ]]; then
    exit 1
  fi

  if [ -d formatter_output ]; then
    cd formatter_output || exit
    for view in $(ls *.js); do
      curl -s --request PUT "${DB_URL}/_design/queries" --upload-file "${view}" -o /dev/null
      if [[ ${?} != 0 ]]; then
        exit 1
      fi
    done
  fi
fi

if [ "${REALUSER}" == true ]; then
  npm start
else
  mocha --timeout 5000 test/"${TEST_NAME}".js
fi
