'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);


describe('basic authentication', () => {
    // Put your test TEST_USERNAME and TEST_PASSWORD in a .env file.
    // The inject method will load them and make them available to use in your
    // tests.
    zapier.tools.env.inject();

    it('Ping Test: should authenticate', (done) => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            }
            ,
            inputData: {
                "test_name":"ECHO TEST",
                'url': process.env.API_URL
            }
        };

        appTester(App.authentication.test, bundle)
            .then((response) => {
                console.log('Full Response: %s',JSON.stringify(response));
                console.log('Code: %s',response.status_code);
                console.log(response.statusCode)
                should.exist(response.status);
                response.status.should.eql("OK");
                response.status_code.should.eql(0);
                //response.statusCode.should.eql(200);
                done();
            })
            .catch(done);
    });

});
