const mongoose = require('mongoose');
const port = process.env.PORT || 9000;

function connect() {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV==="test") {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
        mockgoose.helper.setDbVersion("3.2.1");
        return mockgoose.prepareStorage()
          .then(() => {
              mongoose.connect(process.env.MONGO_TEST, 
                {useCreateIndex: true,useUnifiedTopology:true, useNewUrlParser:true, keepAlive:true,})
                  .then((res, err) => {
                      console.log("TEST = DOCUMENT ")
                    if (err) return reject(err);
                    resolve();
                  })
          })
      }else if(process.env.NODE_ENV === 'dev'){
          return mongoose.connect(process.env.MONGO_DEV,
            {useCreateIndex: true,useUnifiedTopology:true, useNewUrlParser:true, keepAlive:true,})
              .then((res, err) => {
                  console.log("DEV = DOCUMENT")
                if (err) return reject(err);
                resolve();
            })
      }else if(process.env.NODE_ENV === 'pro'){
          return mongoose.connect(process.env.MONGO_PRO,
            {useCreateIndex: true,useUnifiedTopology:true, useNewUrlParser:true, keepAlive:true,})
              .then((res, err) => {
                console.log("PRO= DOCUEMT")
                if (err) return reject(err);
                resolve();
            })
      }else{
        return mongoose.connect(process.env.MONGO_URI,
        {useCreateIndex: true,useUnifiedTopology:true, useNewUrlParser:true, keepAlive:true,})
          .then((res, err) => {
            console.log("Default = NO VARIABLE")
            if (err) return reject(err);
            resolve();
        })}
    });
}
  
function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };
