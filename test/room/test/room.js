const request = require('supertest');
const app = require('../src/daemon').server;
const axios = require('axios');
const user = process.env.USER_SERVICE_URL;

describe('Test PASS for DEVICE', _ => {
    let token;

    before(done => {
        axios.get(`${user}/user/max/max`).then(res => {
            token=res.data.token;
            done()
        });
    });

    function valid_room(json, res) {
        if (json._id !== res.body.room._id)   throw new Error("Bad _id in room");
        if (json.devices.length !== res.body.room.devices.length) throw new Error("Not same length for devices");
        if (json.users.length !== res.body.room.users.length) throw new Error("Not same length for users");
        json.devices.forEach(device => {
            if (!res.body.room.devices.some(dev => dev === device)) throw new Error('Bad devices in room')
        });
        json.users.forEach(user => {
            if (!res.body.room.users.some(us => us === user)) throw new Error('Bad users in room')
        });
    }

    it('get root', done => {
        request(app)
            .get('/')
            .expect(200)
            .end(err => {
                if (err) done(err);
                else done()
            })
    });

    it('get room', done => {
        request(app)
            .get(`/room/maximesroom?token=${token}`)
            .expect(200)
            .expect(res => {
                let json = {
                    _id: "maximesroom",
                    devices: ["mainlight", "temperature"],
                    users: ["maxime", "max"]
                };
                valid_room(json, res)
            })
            .end(err => {
                if (err) done(err);
                else done()
            })
    })
});

describe('Test FAIL for DEVICE', _ => {
    let token;

    before(done => {
        axios.get(`${user}/user/max/max`).then(res => {
            token=res.data.token;
            done()
        })
    });

    describe('GetRoom', _ => {
        it('no token', done => {
            request(app)
                .get('/room/maximesroom')
                .expect(400)
                .end(err => {
                    if (err) done(err);
                    else done()
                })
        });

        it('invalid token', done => {
            request(app)
                .get(`/room/maximesroom?token=${'token'}`)
                .expect(403)
                .end(err => {
                    if(err) done(err);
                    else done()
                })
        });

        it('room doen\'t exist', done => {
            request(app)
                .get(`/room/maximes?token=${token}`)
                .expect(500)
                .end(err => {
                    if(err) done(err);
                    else done()
                })
        })
    });
});
