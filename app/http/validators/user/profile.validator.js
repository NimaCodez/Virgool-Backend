const { body } = require("express-validator");
const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/users.model");

function EditProfileValidator() {
    return [
        body("username").optional().isString().isLength({ min: 4, max: 22 }).withMessage(createHttpError.BadRequest("Username can only be between 4 to 22 chars")).custom(value => {
            return UserModel.findOne({ username: value }).then(user => {
                if (user) {
                    return Promise.reject('Username already in use!');
                }
            })
        }),
        body("firstName").optional().isString().isLength({ min: 3, max: 20 }).withMessage(createHttpError.BadRequest("First name can't be less than 3 or more than 20 chars")),
        body("lastName").optional().isString().isLength({ min: 3, max: 20 }).withMessage(createHttpError.BadRequest("Last name can't be less than 3 or more than 20 chars")),
        body("bio").optional().isString().trim().isLength({ min: 0, max: 350 }).withMessage(createHttpError.BadRequest("Bio can't be more than 350 chars")),
        body("phoneNumber").optional().isString().isMobilePhone("fa-IR").withMessage(createHttpError.BadRequest("Please enter a valid phone number")).custom(value => {
            return UserModel.findOne({ phoneNumber: value }).then(user => {
                if (user) return Promise.reject("Phone number is already in use!")
            })
        })
    ]
}

module.exports = {
    EditProfileValidator
}
