const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const cors = require("cors");

const logger = require("./utilities/logger");
const config = require("./config");

const homeRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const filesRoutes = require("./routes/files");
const customResponses = require("./middlewares/customResponses");

const app = express();
const port = process.env.PORT || config.port;
const ENV = config.env;

app.set("env", ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers");
  next();
});

app.use(helmet());

app.use(passport.initialize());
require("./middlewares/passport")(passport);

app.use(customResponses);

app.use("/", homeRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/files", filesRoutes);

app.use((req, res) => {
  res.notFound();
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  next(err);
});

// Don"t remove next !!!!
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(503).json({
    success: false,
    error: "server_error",
  });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
