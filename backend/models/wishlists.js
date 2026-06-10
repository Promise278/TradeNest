"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Wishlists extends Model {
    static associate(models) {
      Wishlists.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
      Wishlists.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }

  Wishlists.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Wishlists",
      tableName: "Wishlists",
      indexes: [
        {
          unique: true,
          fields: ["userId", "productId"],
        },
      ],
    }
  );

  return Wishlists;
};
