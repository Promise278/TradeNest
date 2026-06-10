"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    static associate(models) {
      Notifications.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Notifications.init(
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
      type: {
        type: DataTypes.ENUM(
          "order",
          "message",
          "payment",
          "review",
          "system"
        ),
        allowNull: false,
        defaultValue: "system",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSONB,
        allowNull: true,
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
      modelName: "Notifications",
      tableName: "Notifications",
    }
  );

  return Notifications;
};
