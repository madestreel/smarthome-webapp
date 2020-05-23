# this image relies on the nodejs image
FROM node:11-alpine
# set working directory
WORKDIR /usr/src/action-service
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apk update && apk add curl

# let NPM packages be called anywhere within the container
ENV PATH /usr/src/action-service/node_modules/.bin:${PATH}
COPY package.json .
RUN npm install
# header for loggining messages
ENV SERVICE_NAME action-d
ENV SERVICE_PORT 80
ENV REACT_APP_AUTH_SERVICE_URL http://user
ENV DEVICE_URL http://device
ENV MQTT_BROKER_URL http://mosquitto
# we now use an script to deploy.sh the authentication service
CMD source boot-in-order.sh
