const express = require("express");
const logger = require("./utilities/logger");

const config = require("./config");
const homeRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
// const customResponses = require( "./middlewares/customResponses" );

const app = express();
const port = process.env.PORT || config.port;
const ENV = config.env;

app.set("env", ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use( customResponses );

// require( "./config/routes" )( app );

app.get("/", homeRoutes);

app.use("/api/v1/users", userRoutes);

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
