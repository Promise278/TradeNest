"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    static associate(models) {
      OrderItems.belongsTo(models.Orders, {
        foreignKey: "orderId",
        as: "order",
      });
      OrderItems.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "product",
      });
      OrderItems.belongsTo(models.Users, {
        foreignKey: "sellerId",
        as: "seller",
      });
    }
  }

  OrderItems.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      sellerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unitPrice: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItems",
      tableName: "OrderItems",
    }
  );

  return OrderItems;
};
