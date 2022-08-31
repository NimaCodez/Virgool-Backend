const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    profileImage: { type: [String] },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phoneNumber: { type: String, unique: true, default: "" },
    phoneNumberConfirmed: { type: Boolean, default: false },
    role: { type: String, default: "USER" },
    token: { type: String, default: "" },
})

const UserModel = model("users", UserSchema)

module.exports = {
    UserModel,
}
