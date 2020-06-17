# this image relies on the nodejs image
FROM node:11-alpine
# set working directory
WORKDIR /usr/src/user-service
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apk update && apk add curl

# let NPM packages be called anywhere within the container
ENV PATH /usr/src/user-service/node_modules/.bin:${PATH}
COPY . .
RUN npm install
# string to create tokens (see utils/en-de-coders.js)
ENV TOKEN_SECRET IhiKrqjq-F(o1k?
# header for loggining messages
ENV SERVICE_NAME user-d
ENV SERVICE_PORT 80

# we now use an script to deploy.sh the authentication service
CMD source boot-in-order.sh
