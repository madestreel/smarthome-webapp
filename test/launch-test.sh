#!/bin/bash
#===============================================================================
#
#          FILE: launch_test.sh
#
#         USAGE: sudo ./launch_test.sh [OPTIONS] [ARGS]
#
#   DESCRIPTION:
#       Launch the desired tests to test the backend rest-api
#       OPTIONS:
#         -h print the help message
#         -b build the specified images given by (-n)
#         -n [ARG=image] the image to build/test, if not present all images will be build/test
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Maxime de Streel, maximedestreel@gmail.com
#  ORGANIZATION:
#       CREATED: 06/01/2020
#      REVISION:  ---
#===============================================================================

usage="usage: $(basename "${BASH_SOURCE[0]}")} [-h] [-n]
    -h  show this help text
    -b  build the image instead of running
    -n  name of the uservice you want to test/build, if not present all tests are build"

test=0
OPTIND=1
BUILD=0
while getopts ':hbn:' option; do
  case "$option" in
    h) echo "$usage"
      exit
      ;;
    n) test=$OPTARG
      ;;
    :) printf "missing argument for -%s\n" "$OPTARG" >&2
      echo "$usage" >&2
      exit
      ;;
    b) BUILD=1
      ;;
    \?) printf "$(basename "${BASH_SOURCE[0]}"): invalid option -- '-%s\n" "$OPTARG" >&2
      echo "$usage" >&2
      exit 1
      ;;
  esac
done

shift $((OPTIND - 1))

if [ "$test" -eq 0 ]; then
  if [ $BUILD -eq 1 ]; then
    docker-compose build
  fi
  exit 0
fi

if [ $BUILD -eq 1 ]; then
  docker-compose build "${test}"
else
  docker-compose rm  -f "${test}"
  docker-compose up "${test}"
fi

