const request = require('supertest');
const expect = require('chai').expect;

const conn = require("../src/config")
const app = require("../src")

describe('urlList test', function(){
    before(function (done) {
      conn.connect().then(()=> done()).catch((err) => done(err));
    })
  
    after(function(done){
      conn.close().then(() => done()).catch((err) => done(err));
    })
  
    it('200 success, all urll', (done) => {
      request(app).get('/api/v1/')
        .then((res) => {
          console.log({body:res.body, status:res.status})
          expect(res.status).to.equal(200);
          expect(body.message).to.equal("url fetched");
          done();
        })
        .catch((err) => done(err));
        done()
    });

    it('404 No Record, all urll', (done) => {
      request(app).get('/api/v1/')
        .then((res) => {
          console.log({body:res.body, status:res.status})
          //expect(res.status).to.equal(404)
          //expect(body.length).to.equal(0);
          done();
        })
        .catch((err) => done(err));
        done()
    });  
})

