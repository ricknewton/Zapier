/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('List Agents for this team', () => {
  it('should run resources.agent', done => {
      const bundle = {
          authData: {
              username: process.env.USERNAME,
              password: process.env.PASSWORD
          }
      };

    appTester(App.resources.agent.list.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        done();
      })
      .catch(done);
  });
});

describe('Get Agent', () => {
    it('should run resources.agent', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData: {
                'id': 3384,
            }
        };

        appTester(App.resources.agent.get.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});

describe('Create Agent RAW', () => {
    it('should run resources.agent.create', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData:{
                'email': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@test.co',
                'first_name':'fname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                'last_name':'lname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }
        };

        appTester(App.resources.agent.create.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});

describe('Create Agent from External Agent', () => {
    it('should run resources.agent.create', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData:{
                'url': process.env.API_URL,
                'email': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@test.co',
                'first_name':'fname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                'last_name':'lname_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                'extapi_id': 1,
                'external_guid':Math.random().toString(36).substring(2, 15)
            }
        };

        appTester(App.resources.agent.create.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});


describe('Find Agent', () => {
    it('should run resources.agent.search', done => {
        const bundle = {
            authData: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            inputData:{
                'url': process.env.API_URL,
                email: 'rick@sisu.co'
            }
        };

        appTester(App.resources.agent.search.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});

