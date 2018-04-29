const express = require('express');
const graphqlHTTP = require('express-graphql');
const Schema = require('./data/Schema.js');
const Dataloader = require('dataloader');

const app = express();
const api = require("./lib/restApi");

app.use('/graphql', graphqlHTTP(req => {

	const loaders = {
		getUsersLoader: new Dataloader(keys => Promise.all(keys.map(api.getUsers))),
		getUserLoader:  new Dataloader(keys => Promise.all(keys.map(key => api.getUser(key)))),
		getPostsLoader:  new Dataloader(keys => Promise.all(keys.map(api.getPosts))),
		getPostLoader:  new Dataloader(keys => Promise.all(keys.map(key => api.getPost(key)))),
	}

	return{
		schema: Schema,
		graphiql: true,
		context:{
			loaders
		}
	}

}));

app.listen(4000);