const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const ProfileType = new GraphQLObjectType({
    name: "ProfileType",
    fields: {
        _id: { type: GraphQLString },
        username: { type: GraphQLString },
        bio: { type: GraphQLString },
        profileImage: { type: new GraphQLList(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString }
    }
})

module.exports = {
    ProfileType,
}
