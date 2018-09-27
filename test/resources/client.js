/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('List Clients for this team', () => {
    it('should run resources.client.list', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData: {
                'agent_id':3384
            }

        };

        appTester(App.resources.client.list.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});


describe('Get Client', () => {
    it('should run resources.client.get', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData: {
                'id': 17158,
            }
        };

        appTester(App.resources.client.get.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});

describe('Create Client RAW', () => {
    it('should run resources.client.create', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData:{
                'email': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@test.co',
                'first_name':'fname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                'last_name':'lname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                'type_id':'s',
                'agent_id': 3384
            }
        };

        appTester(App.resources.client.create.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});

describe('Create Client External', () => {
    it('should run resources.client.create', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData:{
                'email': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@test.co',
                'first_name':'fname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                'last_name':'lname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                'type_id':'s',
                'agent_id': 3384,
                'extapi_id': 1,
                'external_guid':Math.random().toString(36).substring(2, 15)
            }
        };

        appTester(App.resources.client.create.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});


describe('Find Client', () => {
    it('should run resources.client.search', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData:{
                'url': process.env.API_URL,
                email: 'kimberlynewton@me.com'
            }
        };

        appTester(App.resources.client.search.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});

