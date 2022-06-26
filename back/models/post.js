module.exports = (sequelize, DataTypes) => {
  // 테이블명(posts)
  const Post = sequelize.define(
    "Post",
    {
      // id는 자동으로 설정됨
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      locations: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      hideCounts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      turnOffComment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Video);
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsTo(db.User); // as로 구별
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
