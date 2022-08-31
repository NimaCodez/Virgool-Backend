const { ProfileController } = require("../../http/controllers/user/Profile.controller");
const { validationErrorMapper } = require("../../http/middlewares/functions");
const { EditProfileValidator } = require("../../http/validators/user/profile.validator");
const { VerifyAccessToken } = require("../../utils/VerifyAccessToken");

const ProfileRouter = require("express").Router();

ProfileRouter.get("/", VerifyAccessToken, ProfileController.GetProfile)
ProfileRouter.put("/edit-profile", EditProfileValidator(), validationErrorMapper, VerifyAccessToken, ProfileController.EditProfile)
ProfileRouter.put("/upload-profile", VerifyAccessToken, ProfileController.EditProfile)
// ProfileRouter.delete("/delete-account", VerifyAccessToken, ProfileController.EditProfile)

module.exports = {
    ProfileRouter
}
