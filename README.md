## How to launch the app locally

- install docker.io & docker-compose & npm
```
$ sudo apt-get install docker.io docker-compose npm
```
- make a swarm to use docker-compose (useful when backend is over multiple hosts)
```
$ docker swarm init
```
- clone the repo
```
$ git clone https://github.com/destmaxi/smarthome-webapp.git webapp
```
- launch the backend
```
$ cd webapp/src/backend
$ docker-compose up -d
```
- launch the frontend
```
$ cd ../frontend
$ npm install
$ npm start
```

## On Raspberry pi

- You should pull from the rpi branch.
- Don't forget to set the frontend to 0.0.0.0 (in package.json add --host 0.0.0.0 to ng serve).
- The mosquitto server is accessible on port 1880 from the outside instead of 1883 (issue)
- Still developpment mode, all containers and databases are accessible from the outside
- the `docker-compose up -d` action may have a significant cpu usage, if it is the case and the rpi crashes you should launch the containers one by one starting with smarthome-db (i.e. `docker-compose up -d smarthome-db`).

## TODO:

- [x] frontend devices
- [x] frontend login
- [x] backend user u-service
- [ ] Docker file for frontend
- [x] show favorites on home page
- [x] backend devices u-service
- [x] backend room u-service
- [x] frontend rooms
- [x] about me
- [ ] Action u-service
- [ ] Monitoring u-service
