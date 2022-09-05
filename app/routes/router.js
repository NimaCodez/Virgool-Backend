const { graphqlHTTP } = require("express-graphql");
const { GQLConfig } = require("../utils/graphql.config");
const { ProfileRouter } = require("./user/profile.routes");
const { AuthRouter } = require("./user/user.routes");

const MainRouter = require("express").Router();

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/profile", ProfileRouter)
MainRouter.use("/gql", graphqlHTTP(GQLConfig))

module.exports = {
    MainRouter
}
