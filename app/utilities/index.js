exports.extractObject = (obj, keys) => {
  const returnObj = {};
  keys.forEach((key) => {
    returnObj[key] = obj[key];
  });

  return returnObj;
};

exports.generateToken = (payload, key, jwt, expiresIn) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, { expiresIn }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};
