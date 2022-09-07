const catrouter = require("express").Router();
const { CategoryController } = require("../../http/controllers/admin/Category.controller");

catrouter.get("/", CategoryController.GetAllCategories)
catrouter.get("/parents", CategoryController.GetAllParentCategories)
catrouter.post("/add-category", CategoryController.AddNewCategory)
catrouter.patch("/edit-category/:id", CategoryController.EditCategory)
catrouter.delete("/remove-category/:id", CategoryController.DeleteCategory)

module.exports = {
    AdminCategoryRouter: catrouter
}
