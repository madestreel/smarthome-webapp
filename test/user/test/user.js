const request = require('supertest');
const app = require('../src/daemon').server;

describe('Test PASS for USER', _ => {
    let token;

    function delete_user(done) {
         return request(app)
            .delete("/user/maxime")
            .send({token: token})
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {status: 'user successfully deleted'})
            .end(err => {
                if (err) done(err);
                else done()
            })
    }

    before(done => {
        request(app)
            .get("/user/max/max")
            .end(function (err, res) {
                token = res.body.token;
                done()
            })
    });

    describe('Delete Users', _ => {
        afterEach(done => {
            request(app)
                .get("/user/maxime/maxime")
                .expect(500)
                .end(err => {
                    if (err) done(err);
                    else  done()
                });
        });

        it("present", done => {
            delete_user(done)
        });

        it("not present", done => {
            delete_user(done)
        })
    });

    describe('Create Users', _ => {
        afterEach(done => {
            request(app)
                .get('/user/test/test')
                .expect(200)
                .end(err => {
                    if(err) done(err);
                    else done()
                })
        });

        after(done => {
            request(app)
                .delete('/user/test')
                .send({token: token})
                .end(err => {
                    if (err) done(err);
                    else done()
                })
        });

        it("test", done => {
            request(app)
                .post("/user")
                .send({username: 'test', password:'test'})
                .expect(200)
                .end(err => {
                    if(err) done(err);
                    else done()
                })
        });
    });

    it("IsUp", done => {
        request(app)
            .get("/")
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {status: 'success'})
            .end(err => {
                if (err)  done(err);
                else  done()
            })
    });

    it("GetUser", done => {
        request(app)
            .get("/user/max/max")
            .expect(200)
            .end(err => {
                if (err)  done(err);
                else  done()
            })
    });

    it("IsUserConnected", done => {
        request(app)
            .get(`/isconnected/${token}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {status: 'success'})
            .end(err => {
                if (err)  done(err);
                else  done()
            })
    });
});

describe('Test FAIL for USER', _ => {
    let token;

    before(done => {
        request(app).get('/user/max/max').end(function (err, res) {
            token = res.body.token;
            done()
        })
    });

    describe('CreateUser', _ => {
        afterEach(done => {
            request(app)
                .get('/user/username/username')
                .expect(500)
                .end(err => {
                    if(err) done(err);
                    else done()
                })
        });

        it("missing param", done => {
            request(app)
                .post('/user')
                .send({username: 'username'})
                .expect(400)
                .end(err => {
                    if (err) done(err);
                    else done()
                })
        });

        it("user exist", done => {
            request(app)
                .post('/user')
                .send({username: 'max', password: 'max'})
                .expect(500)
                .end(err => {
                    if(err) done(err);
                    else done()
                })
        })
    });

    it("GetUser: missing param", done => {
        request(app)
            .get("/user/max")
            .expect(404)
            .end(err => {
                if (err)  done(err);
                else  done()
            })
    });

    it("GetUser: bad password", done => {
        request(app)
            .get('/user/max/maxime')
            .expect(500)
            .end(err => {
                if (err)  done(err);
                else  done()
            })
    });

    it("IsConnected: bad token", done => {
        request(app)
            .get("/isconnected/token")
            .expect(403)
            .end(err => {
                if (err)  done(err);
                else  done()
            })
    });

    it("IsConnected: no token", done => {
        request(app)
            .get("/isconnected")
            .expect(404)
            .end(err => {
                if (err)  done(err);
                else  done()
            })
    });

    describe('DeleteUser', _ => {
       afterEach(done => {
           request(app)
               .get('/user/max/max')
               .expect(200)
               .end(err => {
                   if(err) done(err);
                   else done()
               })
       });

        it("missing token", done => {
            request(app)
                .delete("/user/max")
                .expect(400)
                .end(err => {
                    if (err)  done(err);
                    else done()
                })
        });

        it("bad token", done => {
            request(app)
                .delete("/user/max")
                .send({token: 'token'})
                .expect(403)
                .end(err => {
                    if (err)  done(err);
                    else done()
                })
        });

        it("missing param", done => {
            request(app)
                .delete("/user")
                .send({token: token})
                .expect(404)
                .end(err => {
                    if (err)  done(err);
                    else done()
                })
        });
    });

});