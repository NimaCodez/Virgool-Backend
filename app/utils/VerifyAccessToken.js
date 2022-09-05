const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users.model");
require("dotenv").config();

async function GetTokenFromHeaders(headers) {
    const token = await headers?.authorization?.split(" ")[1] || [];
    if (token) return token;
    throw createHttpError.Unauthorized("Please Login To Your Account")
}

function SignAccessToken(user) {
    const { username } = user;
    const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "72h"
    })
    return token;
}

async function VerifyAccessToken(req, res, next) {
    try {
        const token = await GetTokenFromHeaders(req.headers)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if (err) throw createHttpError.Unauthorized("Login To Your Account")
                const { username } = payload;
                const user = await UserModel.findOne({ username }, { password: 0 })
                if (!user) throw createHttpError.Unauthorized("Username Or Password is incorrect")
                req.user = user;
                return next()
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}

async function VerifyAccessTokenInGraphQL(req) {
    try {
        const token = await GetTokenFromHeaders(req.body.variables);
        const { username } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const user = await UserModel.findOne(
            { username },
            { password: 0 }
        );
        console.log(user)
        if (!user) throw new createHttpError.Unauthorized("No Account was found");
        return user;
    } catch (error) {
        throw new createHttpError.Unauthorized();
    }
}

module.exports = {
    SignAccessToken,
    VerifyAccessToken,
    VerifyAccessTokenInGraphQL
}
