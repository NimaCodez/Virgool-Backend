const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/users.model");
const { HashString, CompareDataWithHash } = require("../../../utils/functions");
const { SignAccessToken } = require("../../../utils/VerifyAccessToken");
const ControllerBase = require("../controllers.base");

class AuthController extends ControllerBase {
    async SignUp(req, res, next) {
        try {
            const { username, password, firstName, lastName } = req.body;
            req.body.profileImage = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/gi, "/")
            const profileImage = req.body.image;
            const CreateUserResult = await UserModel.create({
                username, password: HashString(password), firstName, lastName, profileImage
            })
            if (!CreateUserResult) throw createHttpError.InternalServerError("Sorry! we were not able to create your account, Please try again later")
            return res.status(201).json({
                status: 201,
                success: true,
                data: {
                    message: "You were successfully signed up! 🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async Login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await UserModel.findOne({ username });
            if (!user) throw createHttpError.NotFound("Your account was not found")
            else if (user && CompareDataWithHash(password, user.password) == false) throw createHttpError.Unauthorized("You were not logged in")
            const token = SignAccessToken(user)
            user.token = token;
            await user.save()
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "You were successfully logged in 🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async ForgotPassword(req, res, next) {
        try {
            const { phoneNumber } = req.body;
            const user = await UserModel.findOne({ phoneNumber }, { token: 0, firstName: 0, lastName: 0, password: 0, phoneNumberConfirmed: 0, username: 0 });
            if (!user) throw createHttpError.NotFound("No account with this phone number was found")
            else if (!user.phoneNumberConfirmed) throw createHttpError("We can't send you recovery code! Because you had not confirmed your Phone number")
            // Gmail a 6 digit Code
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    AuthController: new AuthController(),
}
