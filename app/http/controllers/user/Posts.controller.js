const createHttpError = require("http-errors");
const { PostModel } = require("../../../models/posts.model");
const ControllerBase = require("../controllers.base");
const path = require("path");

class PostController extends ControllerBase {
    async GetMyPosts(req, res, next) {
        try {
            const user = req.user;
            console.log(user._id)
            const blogs = await PostModel.find({ author: user._id }).populate([{ path: "author", select: { username: 1, _id: 0 } }])
            if (!blogs) throw new createHttpError.NotFound("There is no blogs that you have written, So do one! 🎉")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async PublishPost(req, res, next) {
        try {
            const { title, intro, bodyText } = req.body;
            req.body.image = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/gi, "/");
            const banner = req.body.image;
            const PublishPostResult = await PostModel.create({
                title, intro, bodyText, banner, author: req.user._id
            })
            if (!PublishPostResult) throw new createHttpError.InternalServerError("Sorry your Post wasn't published, we promise this will be ok, try again in a few seconds")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Your post was published successfully! 🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async EditPost(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async DeletePost(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    PostController: new PostController(),
}
