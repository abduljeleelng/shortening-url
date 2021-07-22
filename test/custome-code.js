const request = require('supertest');
const expect = require('chai').expect;

const conn = require("../src/config")
const app = require("../src")

describe('Url Custom Code Test', function(){
    before(function (done) {
      conn.connect().then(()=> done()).catch((err) => done(err));
    })
    after(function(done){
      conn.close().then(() => done()).catch((err) => done(err));
    })
    const short_code = "jgsp4XSMX";
    const short_code_invalid = "InvalidShortCode00000000000000000";

    it('400 short code Required, create custom code', (done) => {
        request(app).put(`/api/v1/custom/${short_code}`)
        .send({ 
          URL:""
        })
        .then((res) => {
          //console.log({body:res.body, status:res.status,helo:"Seeing A string"})
          //expect(res.status).to.equal(400)
          //expect(res.body.error).to.equal('url code is required')
          done();
         })
        .catch((err) => done(err));
    });
    it('404 Url Code not found', (done) => {
      request(app).put(`/api/v1/custom/${short_code_invalid}`)
        .send({ 
          urlCode:"gl"
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("url is not found");
          //console.log({body:res.body, status:res.status})
          done();
        })
        .catch((err) => done(err));
    });

    it('200 Sucess', (done) => {
      request(app).put(`/api/v1/custom/${short_code}`)
        .send({ 
          urlCode:"gl"
        })
        .then((res) => {
          //console.log({body:res.body, status:res.status})
          //expect(res.status).to.equal(200)
          done();
        })
        .catch((err) => done(err));
    }); 
})
