const passportJWT = require("passport-jwt");

const config = require("../config");
const db = require("../models");

const ExtractJwt = passportJWT.ExtractJwt;
const StrategyJwt = passportJWT.Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.PASSPORT_SECRET,
};

exports.jwt = new StrategyJwt(opts, async (jwtPayload, cb) => {
  try {
    const user = await User.findByPk(jwtPayload.id);
    cb(null, user);
  } catch (e) {
    cb(e);
  }
});

// const strategyApp = new StrategyJwt(opts, async (jwtPayload, done) => {
//   console.log(jwtPayload);
//   try {
//     const user = await db.User.findOne({
//       where: { userId: jwtPayload?.id },
//     });

//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (error) {
//     return done(error, null);
//   }
// });
