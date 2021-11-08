const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;

//USERS
const {getAllUsers, createUser,} = require("./Users");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: getAllUsers
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: createUser
    },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });