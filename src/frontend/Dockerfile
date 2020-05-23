# this image relies on the nodejs image
FROM node:12.2.0
# set working directory
WORKDIR /usr/src/frontend
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
#RUN apk update && apk add curl

# let NPM packages be called anywhere within the container
ENV PATH /usr/src/frontend/node_modules/.bin:${PATH}
COPY package.json package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

EXPOSE 4200

ENTRYPOINT npm start
