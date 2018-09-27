const TransactionsTrigger = require('./triggers/transactions');
const ClientResource = require('./resources/client');
const AgentResource = require('./resources/agent');

const authentication = require('./authentication');

const handleHTTPError = (response, z) => {
    if (response.status >= 400) {
        throw new Error(`Unexpected status code ${response.status}`);
    }
    return response;
};



// We can roll up all our behaviors in an App.
const App = {
    // This is just shorthand to reference the installed dependencies you have. Zapier will
    // need to know these before we can upload
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,
    authentication: authentication,

    // beforeRequest & afterResponse are optional hooks into the provided HTTP client
    beforeRequest: [
    ],

    afterResponse: [
        handleHTTPError
    ],

    // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
    resources: {
    [ClientResource.key]: ClientResource,
        [AgentResource.key]: AgentResource,
    },

    // If you want your trigger to show up, you better include it here!
    triggers: {
    [TransactionsTrigger.key]: TransactionsTrigger,
    },

    // If you want your searches to show up, you better include it here!
    searches: {
    },

    // If you want your creates to show up, you better include it here!
    creates: {
    }
};

// Finally, export the app.
module.exports = App;
