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

exports.fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "text/plain",
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
};
