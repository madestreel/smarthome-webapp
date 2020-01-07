FROM backend_device

ENV NODE_ENV dev
COPY package.json .
RUN npm install
#COPY test test

ENV TEST_NAME device
ENV SERVICE_NAME test-devices
ENV DB_NAME devices-test
ENV DB_HOST test-smarthome-db
ENV DB_PORT 5984
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}

#CMD ["mocha", "test/user.js", "--reporter", "spec"]
CMD source boot-in-order.sh
