module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // id
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      birth: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      thumbnailImageSrc: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.User, {
      through: "Follow", // 중간 테이블 명 변경
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });

    return User;
  };
  return User;
};
