"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    static associate(models) {
      Payments.belongsTo(models.Orders, {
        foreignKey: "orderId",
        as: "order",
      });
      Payments.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Payments.init(
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "NGN",
      },
      provider: {
        type: DataTypes.ENUM(
          "paystack",
          "flutterwave",
          "stripe",
          "cash",
          "bank_transfer"
        ),
        allowNull: false,
        defaultValue: "paystack",
      },
      providerReference: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "processing",
          "completed",
          "failed",
          "refunded"
        ),
        defaultValue: "pending",
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Payments",
      tableName: "Payments",
    }
  );

  return Payments;
};
