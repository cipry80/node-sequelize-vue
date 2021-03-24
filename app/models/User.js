// const bcrypt = require( "bcrypt" );

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true, min: 18 },
    },
    sex: { type: DataTypes.ENUM, values: ["male", "female"] },
  });

  return User;
};

// userSchema.methods.setPass = function( password ) {
//     const saltRounds = 10;
//     bcrypt.hash( password, saltRounds, function( err, hash ) {
//         this.password = hash;
//     } );
// };

// module.exports = mongoose.model( "User", userSchema );