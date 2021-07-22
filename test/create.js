const request = require('supertest');
const expect = require('chai').expect;

const conn = require("../src/config")
const app = require("../src")

describe('Create URL  test', function(){
    before(function (done) {
      conn.close().then(()=> done()).catch((err) => done(err));
    })
  
    after(function(done){
      conn.close().then(() => done()).catch((err) => done(err));
    })

    it('400 Url Required, create new url', (done) => {
      request(app).post('/api/v1/')
        .send({ 
          URL:""
        })
        .then((res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.equal('url is required')
          //console.log({body:res.body, status:res.status})
          done();
        })
        .catch((err) => done(err));
    });
    it('200 Success, create new url', (done) => {
      request(app).post('/api/v1/')
        .send({ 
          longUrl:"https://wwww.com",
        })
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).to.equal('short url successfully created')
          expect(res.body.data).to.equal(res.body.data)
          //console.log({body:res.body, status:res.status})
          done();
        })
        .catch((err) => done(err));
    });
})
