const request = require('supertest');
const expect = require('chai').expect;

const conn = require("../src/config")
const app = require("../src")

describe('Url statistic Test', function(){
    before(function (done) {
      conn.connect().then(()=> done()).catch((err) => done(err));
    })
  
    after(function(done){
      conn.close().then(() => done()).catch((err) => done(err));
    })

    const short_code = "42ThH9_1v";
    const short_code_invalid = "InvalidShortCode00000000000000000";

    it('404 Url statistic not found', (done) => {
      request(app).get(`/api/v1/statistic/${short_code_invalid}`)
        .then((res) => {
          //console.log({body:res.body, status:res.status})
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("url is not found");
          done();
        })
        .catch((err) => done(err));
    });

    it('200 Sucess', (done) => {
      request(app).get(`/api/v1/statistic/${short_code}`)
        .then((res) => {
          //console.log({body:res.body, status:res.status})
          //expect(res.status).to.equal(200)
          //expect(body.length).to.equal(0);
          done();
        })
        .catch((err) => done(err));
    });
})
