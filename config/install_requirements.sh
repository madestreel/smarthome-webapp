#!/bin/bash -
#===============================================================================
#
#          FILE: install_requirements.sh
#
#         USAGE: sudo ./install_requirements.sh
#
#   DESCRIPTION:
#       Install all required dependencies
#       OPTIONS: ---
#  REQUIREMENTS: This file install all the dependencies present in ./requirements.txt
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Maxime de Streel, maximedestreel@gmail.com
#  ORGANIZATION:
#       CREATED: 02/01/2020
#      REVISION:  ---
#===============================================================================
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;32m'
NC='\033[0m'

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Please run as root${NC}"
  exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

sudo apt update

if [ -f "${DIR}"/requirements.txt ]; then
  sudo apt-get install "$(grep -vE "^\s*#" "${DIR}"/requirements.txt  | tr "\n" " ")" || { echo -e "${RED}Some dependencies couldn't be installed, fix them.${NC}"; exit 1; }
else
  echo -e "${YELLOW}File config/requirements.txt doesn't exist${NC}"
  exit 1
fi

echo -e "${GREEN}All dependencies are installed${NC}"

read -p "Add current user ($(whoami)) to Docker group? [y/n] " -r
if [[ $REPLY =~ ^[Yy]$  ]]; then
  sudo usermod -aG docker "$(whoami)"
fi
