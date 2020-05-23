# this image relies on the nodejs image
FROM node:11-alpine
# set working directory
WORKDIR /usr/src/room-service
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apk update && apk add curl

# let NPM packages be called anywhere within the container
ENV PATH /usr/src/room-service/node_modules/.bin:${PATH}
COPY package.json .
RUN npm install
# header for loggining messages
ENV SERVICE_NAME room-d
ENV SERVICE_PORT 80
ENV REACT_APP_AUTH_SERVICE_URL http://user
# name of container running CouchDB
#ENV DB_HOST 192.168.56.102
ENV DB_HOST smarthome-db
# database name
ENV DB_NAME rooms
# database port default 5984
#ENV DB_PORT 3000
ENV DB_PORT 5984
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# we now use an script to deploy.sh the authentication service
CMD source boot-in-order.sh
