const { AuthController } = require("../../http/controllers/user/UserAuth.controller");
const { validationErrorMapper } = require("../../http/middlewares/functions");
const { SignUpValidator, LoginValidator } = require("../../http/validators/user/auth/auth.validator");
const { FileUpload } = require("../../utils/FileUpload");

const AuthRouter = require("express").Router();

AuthRouter.post("/signup", SignUpValidator(), validationErrorMapper, FileUpload.single("profileImage"), AuthController.SignUp)
AuthRouter.post("/login", LoginValidator(), validationErrorMapper, AuthController.Login)

module.exports = {
    AuthRouter
}
