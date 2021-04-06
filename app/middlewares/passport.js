const passportJWT = require("passport-jwt");

const config = require("../config");
const db = require("../models");

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJwt = passportJWT.Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.PASSPORT_SECRET,
};

const strategy = new StrategyJwt(opts, async (jwtPayload, done) => {
  console.log(jwtPayload);

  await db.User.findOne({
    where: { userId: jwtPayload?.id },
  })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((error) => {
      return done(error, null);
    });
});

module.exports = (passport) => {
  passport.use("custom-strategy", strategy);
};
