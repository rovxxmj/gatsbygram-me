module.exports = (sequelize, DataTypes) => {
  // 테이블명(videos)
  const Video = sequelize.define(
    "Video",
    {
      // id는 자동으로 설정됨
      src: {
        type: DataTypes.STRING(200),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Video.associate = (db) => {
    db.Video.belongsTo(db.Post);
  };
  return Video;
};
