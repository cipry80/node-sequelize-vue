const passportJWT = require("passport-jwt");

const config = require("../config");
const db = require("../models");

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJwt = passportJWT.Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.PASSPORT_SECRET;
// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.PASSPORT_SECRET,
// };

module.exports = (passport) => {
  passport.use(
    new StrategyJwt(opts, (jwtPayload, done) => {
      console.log(jwtPayload);

      db.User.findOne({
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
    })
  );
};
