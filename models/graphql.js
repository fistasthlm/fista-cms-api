const mongoose = require('mongoose');
const graphqlTypes = require('graphql/type');

const GraphQlSchema = new mongoose.Schema({

});


const GraphQl = mongoose.model('GraphQl', GraphQlSchema);

module.export = GraphQl;
