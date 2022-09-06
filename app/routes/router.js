const { graphqlHTTP } = require("express-graphql");
const { GQLConfig } = require("../utils/graphql.config");
const { AdminRouter } = require("./admin/admin.routes");
const { ProfileRouter } = require("./user/profile.routes");
const { AuthRouter } = require("./user/user.routes");

const MainRouter = require("express").Router();

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/profile", ProfileRouter)
MainRouter.use("/admin", AdminRouter)
MainRouter.use("/gql", graphqlHTTP(GQLConfig))

module.exports = {
    MainRouter
}
