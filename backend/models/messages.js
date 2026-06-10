"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate(models) {
      Messages.belongsTo(models.Users, {
        foreignKey: "senderId",
        as: "sender",
      });
      Messages.belongsTo(models.Users, {
        foreignKey: "recipientId",
        as: "recipient",
      });
      Messages.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "product",
      });
      Messages.belongsTo(models.Orders, {
        foreignKey: "orderId",
        as: "order",
      });
    }
  }

  Messages.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      recipientId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Messages",
      tableName: "Messages",
    }
  );

  return Messages;
};
