const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const logger = require("./utilities/logger");
const config = require("./config");

const homeRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const filesRoutes = require("./routes/files");
// const customResponses = require( "./middlewares/customResponses" );

const app = express();
const port = process.env.PORT || config.port;
const ENV = config.env;
require("./middlewares/passport");

app.set("env", ENV);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use( customResponses );

app.get("/", homeRoutes);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/files", filesRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
  );
  next();
});

app.use(helmet());

app.use((req, res) => {
  // res.notFound();
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
