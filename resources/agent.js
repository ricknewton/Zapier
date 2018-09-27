const sample = require('../samples/sample_agent');

const keep = ['email','agent_id','created_ts','desired_income','first_name','last_name','mls_id','mobile_phone',
    'status','title','updated_ts','vision_statement'];

// get a list of agents
const listAgents = (z) => {
    const responsePromise = z.request({
        method:'GET',
        url: process.env.API_URL+'team/get-team-agents'
    });

    return responsePromise
        .then((response) => {
            var agents = z.JSON.parse(response.content)["agents"]
            agents.forEach(function(value){
                Object.keys(value).forEach(function(key) {
                    //var val = value[key];
                    if (keep.indexOf(key) < 0){
                        delete value[key];
                    }
                });
            });

            return agents.map(function(agent){
                agent.id = agent.agent_id;
                // Remove unwanted fields
                //delete agent.agent_id;
                //z.console.log('Agent: %s',JSON.stringify(agent));
                return agent;
            })
        })
        .catch(

        );
};


// get a single agent
const getAgent = (z, bundle) => {
    const responsePromise = z.request({
        method:'GET',
        url: process.env.API_URL+`agent/edit-agent/${bundle.inputData.id}`,
    });
    return responsePromise
        .then(response => {
            var status = z.JSON.parse(response.content)
            var agent = status.agent

            Object.keys(agent).forEach(function(key) {
                //var val = value[key];
                if (keep.indexOf(key) < 0){
                    delete agent[key];
                }
            });

            agent.id = agent.agent_id
            z.console.log('Status: %s',JSON.stringify(status));
            z.console.log('Agent: %s',JSON.stringify(agent));
            return JSON.stringify(agent);
        })
        .catch(

        );
};

// create an agent
const createAgent = (z, bundle) => {
    const responsePromise = z.request({
        method: 'POST',
        url: process.env.API_URL+'agent/edit-agent',
        body: {
            first_name: bundle.inputData.first_name,
            last_name: bundle.inputData.last_name,
            email:bundle.inputData.email,
            extapi_id:bundle.inputData.extapi_id,
            external_guid:bundle.inputData.external_guid,
            mobile_phone:bundle.inputData.mobile_phone,
            vision_statement:bundle.inputData.vision_statement,
            desired_income:bundle.inputData.desired_income,
            title:bundle.inputData.title,
            mls_id:bundle.inputData.mls_id
}
    });
    return responsePromise
        .then((response) => {
            // return id?
            var return_json = z.JSON.parse(response.content)
            return_json.id = return_json.agent_id
            z.console.log('Returning: %s',JSON.stringify(return_json));
            return return_json //z.JSON.parse(response.content)
        })
        .catch(

        );
};


// Find a particular agent by name
const searchAgents = (z, bundle) => {
    const responsePromise = z.request({
        method: 'GET',
        url: `${process.env.API_URL}agent/find-agent`,
        params: {
            email: bundle.inputData.email,
        }
    });
    return responsePromise
        .then((response) => {
            var agents = z.JSON.parse(response.content)["agents"]
            return agents.map(function(agent){
                agent.id = agent.agent_id;
                delete agent.agent_id;
                z.console.log('Agent: %s',JSON.stringify(agent));
                return agent;
            })
        })
        .catch(

        );
};

module.exports = {
    key: 'agent',
    noun: 'Agent',

    get: {
        display: {
            label: 'Get Agent',
            description: 'Gets an agent.'
        },
        operation: {
            inputFields: [
                {key: 'agent_id', required: true}
            ],
            perform: getAgent
        },
    },

    list: {
        display: {
            label: 'New Agent',
            description: 'Lists the agents.'
        },
        operation: {
            perform: listAgents
        }
    },

    create: {
        display: {
            label: 'Create Agent',
            description: 'Creates a new agent.'
        },
        operation: {
            inputFields: [
                {key: 'email', required: true},
                {key: 'first_name', required: true},
                {key: 'last_name', required: true},
                {key: 'extapi_id', required: false, choices: { 0: 'Moxi Works',1:'Paperless Pipeline'}},
                {key: 'external_guid', required: false},
                {key: 'mobile_phone', required: false},
                {key: 'vision_statement', required: false},
                {key: 'desired_income', required: false},
                {key: 'title', required: false},
                {key: 'mls_id', required: false}
            ],
            perform: createAgent
        },
    },

    search: {
        display: {
            label: 'Find Agent',
            description: 'Finds an agent by searching.'
        },
        operation: {
            inputFields: [
                {key: 'email', label: 'Email',required: true}
            ],
            perform: searchAgents
        },
    },


    sample: sample,

    outputFields: [
        {key: 'id', label: 'AgentID'},
        {key: 'agent_id', label: 'Sisu AgentID'},
        {key: 'first_name', label: 'First Name'},
        {key: 'last_name', label: 'Last Name'},
        {key: 'email', label: 'Email'},
        {key: 'extapi_id', label: 'External API'},
        {key: 'external_guid', label: 'External ID'},
        {key: 'mobile_phone', label: 'Mobile Phone'},
        {key: 'vision_statement', label: 'Vision Statement'},
        {key: 'desired_income', label: 'Desired Income'},
        {key: 'title', label: 'Title'},
        {key: 'mls_id', label: 'MLS ID'}
    ]
};