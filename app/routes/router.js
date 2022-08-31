const { ProfileRouter } = require("./user/profile.routes");
const { AuthRouter } = require("./user/user.routes");

const MainRouter = require("express").Router();

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/profile", ProfileRouter)

module.exports = {
    MainRouter
}
