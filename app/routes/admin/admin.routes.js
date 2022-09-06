const AdminRouter = require("express").Router()
const { AdminCategoryRouter } = require("./categories.router")

AdminRouter.use("/categories", AdminCategoryRouter)

module.exports = {
    AdminRouter
}
