const request = require('supertest');
const app = require('../src/daemon').server;

describe('Test PASS for DEVICE', _ => {
    it('get root', done => {
        request(app)
            .get('/')
            .expect(200)
            .end(err => {
                if (err) done(err);
                else done()
            })
    })
});
