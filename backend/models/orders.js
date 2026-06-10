"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "buyer",
      });
      Orders.belongsTo(models.Addresses, {
        foreignKey: "addressId",
        as: "shippingAddress",
      });
      Orders.hasMany(models.OrderItems, {
        foreignKey: "orderId",
        as: "items",
      });
      Orders.hasMany(models.Payments, {
        foreignKey: "orderId",
        as: "payments",
      });
      Orders.hasMany(models.Reviews, {
        foreignKey: "orderId",
        as: "reviews",
      });
      Orders.hasMany(models.Messages, {
        foreignKey: "orderId",
        as: "messages",
      });
    }
  }

  Orders.init(
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
      addressId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
          "refunded"
        ),
        defaultValue: "pending",
      },
      subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      shippingFee: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "NGN",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      placedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "Orders",
    }
  );

  return Orders;
};
