const sample = require('../samples/sample_client');

// Values to return
const keep = ['email','client_id','created_ts','first_name','last_name','mobile_phone',
    'status','updated_ts','address1','address2','city','state','postal_code','mobile_phone','home_phone','trans_amt'];

// get a list of agents
const listClients = (z) => {
    const responsePromise = z.request({
        method:'GET',
        url: process.env.API_URL+'agent/get-clients/'+'{{bundle.inputData.agent_id}}'
    });

    return responsePromise
        .then((response) => {
            var clients = z.JSON.parse(response.content)["clients"]
            // Items to keep:
            clients.forEach(function(value){
                Object.keys(value).forEach(function(key) {
                    //var val = value[key];
                    if (keep.indexOf(key) < 0){
                        delete value[key];
                    }
                });
            });

            return clients.map(function(client){
                client.id = client.client_id;
                // Remove unwanted fields
                //delete client.client_id;
                z.console.log('Client: %s',JSON.stringify(client));
                return client;
            })
        })
        .catch(

        );
};


// get a single client
const getClient = (z, bundle) => {
    const responsePromise = z.request({
        method:'GET',
        url: process.env.API_URL+`client/edit-client/${bundle.inputData.id}`,
    });
    return responsePromise
        .then(response => {
            var status = z.JSON.parse(response.content)
            var client = status.client
            Object.keys(client).forEach(function(key) {
                //var val = value[key];
                if (keep.indexOf(key) < 0){
                    delete client[key];
                }
            });

            client.id = client.client_id
            //z.console.log('Status: %s',JSON.stringify(status));
            z.console.log('Client: %s',JSON.stringify(client));
            return JSON.stringify(client);
        })
        .catch(

        );
};

// create a client
const createClient = (z, bundle) => {
    const responsePromise = z.request({
        method: 'POST',
        url: process.env.API_URL+'client/edit-client/'+'{{bundle.inputData.agent_id}}',
        body: {
            first_name: bundle.inputData.first_name,
            last_name: bundle.inputData.last_name,
            email:bundle.inputData.email,
            type_id:bundle.inputData.type_id,
            extapi_id:bundle.inputData.extapi_id,
            address_1:bundle.inputData.address_1,
            address_2:bundle.inputData.address_2,
            city:bundle.inputData.city,
            state:bundle.inputData.state,
            postal_code:bundle.inputData.postal_code,
            mobile_phone:bundle.inputData.mobile_phone,
            home_phone:bundle.inputData.home_phone,
            trans_amt:bundle.inputData.trans_amt,
        }
    });
    return responsePromise
        .then((response) => {
            // return id?
            var return_json = z.JSON.parse(response.content)
            return_json.id = return_json.client_id
            z.console.log('Returning: %s',JSON.stringify(return_json));
            return return_json //z.JSON.parse(response.content)
        })
        .catch(

        );
};


// Find a particular agent by name
const searchClients = (z, bundle) => {
    const responsePromise = z.request({
        method: 'GET',
        url: process.env.API_URL+'client/find-client',
        params: {
            email: bundle.inputData.email,
        }
    });
    return responsePromise
        .then((response) => {
            var clients = z.JSON.parse(response.content)["clients"]
            clients.forEach(function(value){
                Object.keys(value).forEach(function(key) {
                    //var val = value[key];
                    if (keep.indexOf(key) < 0){
                        delete value[key];
                    }
                });
            });
            return clients.map(function(client){
                client.id = client.client_id;
                //delete client.client_id;
                z.console.log('CLient: %s',JSON.stringify(client));
                return client;
            })
        })
        .catch(

        );
};

module.exports = {
    key: 'client',
    noun: 'Client',

    get: {
        display: {
            label: 'Get Client',
            description: 'Gets a Client.'
        },
        operation: {
            inputFields: [
                {key: 'id', required: true}
            ],
            perform: getClient
        },
    },

    list: {
        display: {
            label: 'New Client',
            description: 'Lists the clients.'
        },
        operation: {
            inputFields: [
                //{key: 'agent_id', required: true}
                {key: 'agent_id', required: true, dynamic: 'agentList.id.email'},
            ],
            perform: listClients
        }
    },

    create: {
        display: {
            label: 'Create Client',
            description: 'Creates a new client.'
        },
        operation: {
            inputFields: [
                {key: 'email', required: true},
                {key: 'first_name', required: true},
                {key: 'last_name', required: true},
                {key: 'type_id', required: true, choices: { 's': 'Seller', 'b': 'Buyer'}},
                {key: 'agent_id', required: true, dynamic: 'agentList.id.email'},
                {key: 'extapi_id', required: false, choices: { 0: 'Moxi Works',1:'Paperless Pipeline'}},
                {key: 'external_guid', required: false},
                {key: 'updated_ts', required: false},
                {key: 'address_1', required: false},
                {key: 'address_2', required: false},
                {key: 'city', required: false},
                {key: 'state', required: false},
                {key: 'postal_code', required: false},
                {key: 'mobile_phone', required: false},
                {key: 'home_phone', required: false},
                {key: 'trans_amt', required: false},

                /*

                appt_dt	date
                signed_dt	date
                uc_dt	date
                closed_dt	date
                paid_dt	date

                trans_amt	double precision
                commission_amt	double precision
                gross_commission_amt	double precision

                lead_dt	date


                lead_type_id	integer
                status	character

                transaction_id	character varying
                file_import_id	integer
                commission_rate	numeric
                team_income_amt	double precision
                trans_fee_amt	double precision
                offer_ref_dt	date
                seller_disclosure_dt	date
                due_diligence_deadline_dt	date
                financing_appraisal_deadline_dt	date
                title_company	character varying
                mortgage_company	character varying
                home_inspection_company	character varying
                raw_agent_name	character varying
                raw_lead	character varying
                import_dt	date
                note	text
                home_warranty_company	character varying
                showings	integer
                trans_fee_recipient	character varying
                settlement_dt	date
                is_locked	boolean
                is_priority	boolean
                current_association	character varying
                last_year_amt	integer
                income_potential_amt	integer
                closed_units	integer
                closed_volume_amt	integer
                annual_volume_amt	integer
                market_id	integer
                */
            ],
            perform: createClient
        },
    },

    search: {
        display: {
            label: 'Find Client',
            description: 'Finds a client by searching.'
        },
        operation: {
            inputFields: [
                {key: 'email', required: true}
            ],
            perform: searchClients
        },
    },


    sample: sample,

    outputFields: [
        {key: 'id', label: 'ClientID'},
        {key: 'client_id', label: 'Sisu ClientID'},
        {key: 'first_name', label: 'First Name'},
        {key: 'last_name', label: 'Last Name'},
        {key: 'email', label: 'Email'},
        {key: 'mobile_phone', label: 'Phone'},
        {key: 'status', label: 'Status'},
        {key: 'type_id', label: 'Type'},
        {key: 'extapi_id', label: 'External API'},
        {key: 'external_guid', label: 'External ID'},
        {key: 'updated_ts', label: 'Updated Time'},
        {key: 'address_1', label: 'Address 1'},
        {key: 'address_2', label: 'Address 2'},
        {key: 'city', label: 'City'},
        {key: 'state', label: 'State'},
        {key: 'postal_code', label: 'Postal Code'},
        {key: 'mobile_phone', label: 'Mobile Phone'},
        {key: 'home_phone', label: 'Home Phone'},
        {key: 'trans_amt',label:'Transaction Amount'},
    ]
};