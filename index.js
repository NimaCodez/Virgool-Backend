const Application = require("./app/server");
new Application(process.env.PORT || 5000, process.env.DB_URL || "mongodb://localhost:27017/virgoolDb")