module.exports = (sequelize, DataTypes) => {
  const Dm = sequelize.define(
    "Dm",
    {
      // id
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      timestamps: true,
      underscored: false,
      paranoid: false,
      modelName: "Dm",
      tableName: "dms",
    }
  );

  Dm.associate = (db) => {
    return Dm;
  };
  return Dm;
};
