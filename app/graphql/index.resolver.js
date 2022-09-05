const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { ProfileResolver } = require("./queries/profile.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        profile: ProfileResolver,
    }
})

// const RootMutations = new GraphQLObjectType({
//     name: "RootMutations",
//     fields: {
//         CreateCommentForBlog: CreateCommentForBlog,
//     }
// })

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutations,
})

module.exports = {
    graphqlSchema
}
