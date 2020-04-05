## How to launch the app locally

- install docker.io & docker-compose
```
$ sudo apt-get install docker.io docker-compose
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
$ npm start

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
