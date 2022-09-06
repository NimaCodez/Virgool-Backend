const catrouter = require("express").Router();
const { CategoryController } = require("../../http/controllers/admin/Category.controller");

catrouter.post("/add-category", CategoryController.AddNewCategory)

module.exports = {
    AdminCategoryRouter: catrouter
}
