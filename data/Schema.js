var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const User = new GraphQLObjectType({
	name: 'User',
	fields:{
		firstName: {
			type: GraphQLString,
			description: "This users first name",
			resolve: () => "Ola"
		},
		lastName: {
			type: GraphQLString,
			description: "This users last name",
			resolve: () => "Normann"
		},
		friends: {
			type: GraphQLList(User),
			description: "This users friends",
			resolve: ()=> [1,2,3,4]
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'Viewer',
	fields:{
		viewer: {
			type: User,
			resolve: () => ""
		},
		servertime: {
			type: GraphQLString,
			resolve: () => new Date()
		}
	}
});

const Schema = new GraphQLSchema({
	query: RootQuery
});

module.exports = Schema;