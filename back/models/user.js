module.exports = (sequelize, DataTypes) => {
  // 테이블명(users)
  const User = sequelize.define(
    "User",
    {
      // id는 자동으로 설정됨
      email: {
        type: DataTypes.STRING(30),
        allowNull: true,
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
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      avartar: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      snsId: {
        type: DataTypes.STRING(50),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Hashtag);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.User, {
      through: "Follow",
      foreignKey: "followingId",
      as: "Followers",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      foreignKey: "followerId",
      as: "Followings",
    });
    db.User.hasMany(db.Post); // as로 별칭 구분 , through - 중간테이블명
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  };
  return User;
};
