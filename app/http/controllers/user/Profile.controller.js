const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/users.model");
const ControllerBase = require("../controllers.base");
const path = require("path");

class ProfileController extends ControllerBase {

    async GetProfile(req, res, next) {
        try {
            const user = req.user;
            return res.status(200).json({
                status: 200,
                succesS: true,
                data: {
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async EditProfile(req, res, next) {
        try {
            const data = { ...req.body };
            const userID = req.user._id;
            const UpdateResult = await UserModel.updateOne({ _id: userID }, { $set: data })
            if (!UpdateResult.modifiedCount) throw createHttpError.InternalServerError("Sorry! Profile was not updated, Please try again in a few moments!")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Profile was edited successfully! 🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async UploadProfilePicture(req, res, next) {
        try {
            const userID = req.user._id;
            req.body.image = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/gi, "/")
            const profileImage = req.body.image;
            const UpdateProfileResult = await UserModel.updateOne({ _id: userID }, { $set: { profileImage: profileImage } })
            if (!UpdateProfileResult.modifiedCount) throw createHttpError.InternalServerError("Sorry! Your profile wasn't updated, Please try Again in a few moments")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Your profile was updated successfully! 🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async DeleteAccount(req, res, next) {
        const user = req.user;
        const { username } = req.params;
        if (username != user.username ) throw createHttpError.BadRequest("You Can't Delete Another Accounts!")
        const DeleteResult = await UserModel.deleteOne({ user: user._id })
        if (!DeleteResult.deletedCount) throw createHttpError.InternalServerError("Your Account was not deleted!")
        req.user = null;
        return res.status(200).json({
            status: 200,
            success: true,
            data: {
                message: "Your Account was deleted successfully! Come back soon 🎉"
            }
        })
    }
}

module.exports = {
    ProfileController: new ProfileController(),
}
