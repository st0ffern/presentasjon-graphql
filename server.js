const express = require('express');
const graphqlHTTP = require('express-graphql');
const Schema = require('./data/Schema.js');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

app.listen(4000);