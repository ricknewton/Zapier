'use strict';

const authentication = {
    type: 'basic',
    test: {
        method: 'GET',
        url: process.env.API_URL + 'ping-test'
    },
    connectionLabel: '{{bundle.authData.username}}'
};

module.exports = authentication;
