/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('List Client Transactions for this team', () => {
    it('should run trigger transactions', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            }
        };

        appTester(App.triggers.transactions.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});

