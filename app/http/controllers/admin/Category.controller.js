const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories.model");
const ControllerBase = require("../controllers.base");

class CategoryController extends ControllerBase {
    async GetAllParentCategories(req, res, next) {
        try {
            const Categories = await CategoryModel.find({ parent: undefined });
            if (!Categories) throw createHttpError.NotFound("No Categories were found!")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    Categories
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async GetAllCategories(req, res, next) {
        try {
           
        } catch (error) {
            next(error)
        }
    }
    async AddNewCategory(req, res, next) {
        try {
            const { title, parent } = req.body;
            const CreateResult = await CategoryModel.create({ title, parent });
            if (!CreateResult) throw createHttpError.InternalServerError("Category was not created!")
            return res.status(201) .json({
                status: 201,
                success: true,
                data: {
                    message: "Category was created! 🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async EditCategory(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async DeleteCategory(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    CategoryController: new CategoryController(),
}
