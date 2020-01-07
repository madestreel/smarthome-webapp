FROM backend_room

ENV NODE_ENV dev
COPY package.json .
RUN npm install
#COPY test test

ENV TEST_NAME room
ENV SERVICE_NAME test-rooms
ENV DB_NAME rooms-test
ENV DB_HOST test-smarthome-db
ENV DB_PORT 5984
ENV USER_SERVICE_URL http://auth:5090
ENV REACT_APP_AUTH_SERVICE_URL=http://auth:5090
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}

#CMD ["mocha", "test/user.js", "--reporter", "spec"]
CMD source boot-in-order.sh
