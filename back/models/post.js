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
      location: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      hideCounts: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      turnOffComments: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    db.Post.hasMany(db.Mention);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.Mention, { through: "PostMention" });
    db.Post.belongsTo(db.User); // as로 구별
    db.Post.belongsToMany(db.User, { through: "Like", as: "Liker" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
