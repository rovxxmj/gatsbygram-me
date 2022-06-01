module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // id
      email: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true, // null도 고유로 처리
      },
      //
      // phone: {
      //   type: DataTypes.STRING(30),
      //   allowNull: true,
      //   unique: true,
      // },
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
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: {
        type: DataTypes.STRING(30),
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
      charset: "utf8", // 한글 지원
      collate: "utf8_general_ci",
      timestamps: true, // 생성, 수정, 삭제 일 기록
      paranoid: true, // 삭제 데이터 보관(deletedAt Col)
      underscored: false,
      modelName: "User",
      tableName: "users",
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
