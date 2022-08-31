const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { UserModel } = require("../../../models/users.model");
const ControllerBase = require("../controllers.base");

class ProfileController extends ControllerBase {

    async GetProfile(req, res, next) {
        try {
            console.log("req.user: ", req.user)
            const user = req.user;
            return res.status(200).json ({
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
            const data = {...req.body};
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
        
    }

    async DeleteAccount(req, res, next) {

    }
}

module.exports = {
    ProfileController: new ProfileController(),
}
