const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, unique: true, required: true }
})

const UserModel = model("users", UserSchema)

module.exports = {
    UserModel,
}
