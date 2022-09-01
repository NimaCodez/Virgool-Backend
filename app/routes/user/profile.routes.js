const { ProfileController } = require("../../http/controllers/user/Profile.controller");
const { validationErrorMapper } = require("../../http/middlewares/functions");
const { EditProfileValidator } = require("../../http/validators/user/profile.validator");
const { FileUpload } = require("../../utils/FileUpload");
const { VerifyAccessToken } = require("../../utils/VerifyAccessToken");

const ProfileRouter = require("express").Router();

ProfileRouter.get("/", VerifyAccessToken, ProfileController.GetProfile)
ProfileRouter.patch("/edit-profile", EditProfileValidator(), validationErrorMapper, VerifyAccessToken, ProfileController.EditProfile)
ProfileRouter.patch("/upload-profile", VerifyAccessToken, FileUpload.single("profileImage"), ProfileController.UploadProfilePicture)
ProfileRouter.delete("/delete-account/:username", VerifyAccessToken, ProfileController.DeleteAccount)

module.exports = {
    ProfileRouter
}
