"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    static associate(models) {
      CartItems.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
      CartItems.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }

  CartItems.init(
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "CartItems",
      tableName: "CartItems",
      indexes: [
        {
          unique: true,
          fields: ["userId", "productId"],
        },
      ],
    }
  );

  return CartItems;
};
