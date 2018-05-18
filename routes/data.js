const graphqlHTTP = require('express-graphql');
const GraphQl = require('../models/graphql');

server.get('/data', graphqlHTTP({ schema: GraphQl }));
