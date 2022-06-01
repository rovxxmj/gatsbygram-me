module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // id
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      underscored: false,
      paranoid: false,
      modelName: "Image",
      tableName: "images",
    }
  );

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
