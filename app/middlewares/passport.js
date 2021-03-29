const passport = require("passport");
const passportJWT = require("passport-jwt");

const config = require("../config");
const db = require("../models");

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJwt = passportJWT.Strategy;

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.PASSPORT_SECRET,
    },
    function (jwtPayload, done) {
      return db.User.findOne({
        where: { userId: jwtPayload.userId },
      })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
