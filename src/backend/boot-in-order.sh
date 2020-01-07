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
echo "Wait (indefenitly) until the DB creation (name: ${DB_NAME})."
echo "The DB URL is: ${DB_URL}"
until curl --request PUT "${DB_URL}" ; do
  echo -e "\t DB (${DB_NAME}) wasn't created - trying again later..."
  sleep 2
done
echo "DB (${DB_NAME}) was created!"

echo "Filling de DB ..."
if [ -d jsons ]; then
  cd jsons || exit
  source fill_db.sh "${DB_URL}"
  cd ..
fi
echo "DB filled"

if [ -d views ]; then
  echo "Apply a formatter for each view"
  mkdir formatter_output
  DEBUG=views* node func_to_string.js
  if [[ ${?} != 0 ]]; then
    echo -e "ERROR: during the creation of views\nEND OF \{0}"
    exit 1
  fi
  echo -e "\tDONE"

  if [ -d formatter_output ]; then
    cd formatter_output || exit
    echo "Creation of views for product DB"
    for view in $(ls *.js); do
      curl --request PUT "${DB_URL}/_design/queries" --upload-file "${view}"
      if [[ ${?} != 0 ]]; then
        echo -e "ERROR: during the creation of view ${view}\nEND OF \{0}"
        exit 1
      fi
    done
    echo -e "\tDONE"
  fi
fi

echo "Start ${SERVICE_NAME} service..."
npm start
