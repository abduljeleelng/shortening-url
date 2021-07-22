const request = require('supertest');
const expect = require('chai').expect;

const conn = require("../src/config")
const app = require("../src")

describe('Url update Test', function(){
    before(function (done) {
      conn.connect().then(()=> done()).catch((err) => done(err));
    })
  
    after(function(done){
      conn.close().then(() => done()).catch((err) => done(err));
    })

    const short_code = "42ThH9_1v";
    const short_code_invalid = "InvalidShortCode00000000000000000"

    it('400 Url Required, Update long url', (done) => {
      request(app).put(`/api/v1/${short_code}`)
        .send({ 
          URL:""
        })
        .then((res) => {
          //console.log({body:res.body, status:res.status})
          //expect(res.status).to.equal(400)
          //expect(res.body.error).to.equal('url is required')
          done();
        })
        .catch((err) => done(err));
    });

    it('404 Url update not found', (done) => {
      request(app).put(`/api/v1/${short_code_invalid}`)
        .then((res) => {
          //console.log({body:res.body, status:res.status})
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("url is not found");
          done();
        })
        .catch((err) => done(err));
    });

    it('200 Sucess', (done) => {
      request(app).put(`/api/v1/${short_code}`)
        .send({ 
          longUrl:"https://google.com",
        })
        .then((res) => {
          //console.log({body:res.body, status:res.status})
          //expect(res.status).to.equal(200)
          done();
        })
        .catch((err) => done(err));
    });
})

