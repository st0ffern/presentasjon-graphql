var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLInt
} = require('graphql');


const User = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLInt},
		name: { type: GraphQLString},
		username: { type: GraphQLString},
		email: { type: GraphQLString},
		phone: { type: GraphQLString},
		website: { type: GraphQLString},
		posts: {
			type: new GraphQLList(Post),
			resolve: async (source, args, {loaders}) => {
				let posts = await loaders.getPostsLoader.load("all");
				return posts.filter(post => post.userId == source.id)
			}
		},
	})
});
const Post = new GraphQLObjectType({
	name: 'Post',
	fields:{
		id: { type: GraphQLInt},
		userId: { type: GraphQLInt},
		title: { type: GraphQLString},
		body: { type: GraphQLString},
		user: { 
			type: User,
			resolve: (source, args, {loaders}) => loaders.getUserLoader.load(source.userId)
		},
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'Viewer',
	fields:{
		users: {
			type: new GraphQLList(User),
			args:{
				id: { type: GraphQLInt},
				username: { type: GraphQLString}
			},
			resolve: async (source, args, {loaders}) => {
				let users = await loaders.getUsersLoader.load("all");
				if (args.id)
					return users.filter(user => user.id == args.id)
				if (args.username)
					return users.filter(user => user.username.indexOf(args.username) != -1)
				return users;
			}
		},
		posts: {
			type: GraphQLList(Post),
			resolve: (source, args, {loaders}) => loaders.getPostsLoader.load("all")
		},
	}
});

const UserInputType = new GraphQLInputObjectType({
	name: "UserInputType",
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLInt)},
		name: {type: GraphQLString},
	})
});

const RootMutations = new GraphQLObjectType({
	name: "RootMutations",
	description: "Make changes to a user",
	fields: () => ({
		createUser: {
			type: User,
			name: "Create new user",
			description: "another one..",
			args: {
				user: {type: UserInputType}
			},
			resolve: (source, args, {loaders}) => {
				//resolve function and return new object
				return loaders.getUserLoader.load(args.id)
			}
		},
		updateUser:{
			type: User,
			name: "Update users name",
			description: "more details",
			args: {
				id: {type: new GraphQLNonNull(GraphQLInt)},
				name: {type: GraphQLString},
			},
			resolve: (source, args, {loaders}) => {
				//resolve function and return new object
				return loaders.getUserLoader.load(args.id)
			}
		},
	})

})

const Schema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutations
});

module.exports = Schema;

