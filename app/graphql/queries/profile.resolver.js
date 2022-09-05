const { GraphQLString } = require("graphql");
const { UserModel } = require("../../models/users.model");
const { ProfileType } = require("../typeDefs/profile.type");

const ProfileResolver = {
    type: ProfileType,
    resolve: async (_, args, context) => {
        const { req } = context;
        return await UserModel.find({ _id: req.user._id });
    }
}

module.exports = {
    ProfileResolver
}