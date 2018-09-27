// triggers on transactions with a certain tag
const triggerTransactions = (z) => {
    const responsePromise = z.request({
        method:'GET',
        url: process.env.API_URL+'team/get-team-clients'
    });

    return responsePromise
        .then((response) => {
            var clients = z.JSON.parse(response.content)["clients"]

            /*
            clients.forEach(function(value){
                Object.keys(value).forEach(function(key) {
                    //var val = value[key];
                    if (keep.indexOf(key) < 0){
                        delete value[key];
                    }
                });
            });
            */
            return clients.map(function(client){
                client.id = client.client_id;
                z.console.log('Client: %s',JSON.stringify(client));
                return client;
            })
        })
        .catch(

        );
};

module.exports = {
  key: 'transactions',
  noun: 'Transactions',

  display: {
    label: 'Get Client Transactions',
    description: 'Triggers on a new client transactions.'
  },

  operation: {
    inputFields: [
      
    ],
    perform: triggerTransactions,

    sample: {
      id: 1,
      name: 'Test'
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'}
    ]
  }
};
