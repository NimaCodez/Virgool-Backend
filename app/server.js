const express = require("express");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { parse } = require("url");
const { MainRouter } = require("./routes/router");
require("dotenv").config();

module.exports = class Application {
    #app = express();
    #DB_URL;
    #PORT;
    constructor(PORT = process.env.PORT, DB_URL = process.env.DB_URL) {
        this.#DB_URL = DB_URL;
        this.#PORT = PORT;
        this.ConfigServer();
        this.ConnectToMongoDB();
        this.CreateServer();
        this.CreateRoutes();
        this.ErrorHandler();
    }

    CreateRoutes() {
        this.#app.use(MainRouter)
    }

    ConnectToMongoDB() {
        mongoose.connect(this.#DB_URL, (err) => {
            if (!err) return console.log("Established connection to MongoDB")
            return console.log("Failed to connect to MongoDB")
        })
        mongoose.connection.on("connected", () => {
            console.log("Connected To MongoDB")
        })
        mongoose.connection.on("disconnect", () => {
            console.log("MongoDB Disconnected")
        })
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }

    CreateServer() {
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT, () => {
            `Server listening on >> ${this.#PORT}`
        })
    }

    ConfigServer() {
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, '..', "public")));
        this.#app.use((req, res, next) => {
            req.pathname = parse(req.url).pathname;
            next()
        })
    }

    ErrorHandler() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound("Route not found 🔍"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createHttpError.InternalServerError()
            const status = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(status).json({
                errors: {
                    status,
                    message
                }
            })
        })
    }

}