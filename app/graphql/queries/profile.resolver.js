const { GraphQLString } = require("graphql");
const createHttpError = require("http-errors");
const { UserModel } = require("../../models/users.model");
const { VerifyAccessTokenInGraphQL } = require("../../utils/VerifyAccessToken");
const { ProfileType } = require("../typeDefs/profile.type");

const ProfileResolver = {
    type: ProfileType,
    args: {
        authorization: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        console.log("user: ", user)
        if (!user) throw createHttpError.Unauthorized("No Accounts was found")
        return await UserModel.findOne({ _id: user._id  });
    }
}

module.exports = {
    ProfileResolver
}