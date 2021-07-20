const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "Url Shortening services",
        description: "the services allows the users to shortening the long url "
    },
    host: "https://short-url-dev.herokuapp.com/api/v1",
    basePath: "/",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './docs/swagger_output.json'
const endpointsFiles = ['./src/app/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')           // Your project's root file
})