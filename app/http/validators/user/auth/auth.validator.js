const { body } = require("express-validator");
const createHttpError = require("http-errors");
const { UserModel } = require("../../../../models/users.model");

function SignUpValidator() {
    return [
        body("username").notEmpty().isString().isLength({ min: 4, max: 22 }).withMessage(createHttpError.BadRequest("Username can only be between 4 to 22 chars")).custom(value => {
            return UserModel.findOne({ username: value }).then(user => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
            })
        }),
        body("password").notEmpty().isString().isLength({ min: 6, max: 25 }).withMessage(createHttpError.BadRequest("Password must be from 6 to 25 chars")),
        body("firstName").optional().isString().isLength({ min: 3, max: 20 }).withMessage(createHttpError.BadRequest("First name can't be less than 3 or more than 20 chars")),
        body("lastName").optional().isString().isLength({ min: 3, max: 20 }).withMessage(createHttpError.BadRequest("Last name can't be less than 3 or more than 20 chars")),
    ]
}

function LoginValidator() {
    return [
        body("username").notEmpty().isString().isLength({ min: 4, max: 22 }).withMessage(createHttpError.BadRequest("Username can only be between 4 to 22 chars")),
        body("password").notEmpty().isString().isLength({ min: 6, max: 25 }).withMessage(createHttpError.BadRequest("Password must be from 6 to 25 chars")),
    ]
}

module.exports = {
    SignUpValidator,
    LoginValidator
}
