"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Products, {
        foreignKey: "sellerId",
        as: "products",
      });
      Users.hasMany(models.Addresses, {
        foreignKey: "userId",
        as: "addresses",
      });
      Users.hasMany(models.Orders, {
        foreignKey: "userId",
        as: "orders",
      });
      Users.hasMany(models.OrderItems, {
        foreignKey: "sellerId",
        as: "sales",
      });
      Users.hasMany(models.CartItems, {
        foreignKey: "userId",
        as: "cartItems",
      });
      Users.hasMany(models.Wishlists, {
        foreignKey: "userId",
        as: "wishlists",
      });
      Users.hasMany(models.Reviews, {
        foreignKey: "userId",
        as: "reviews",
      });
      Users.hasMany(models.Messages, {
        foreignKey: "senderId",
        as: "sentMessages",
      });
      Users.hasMany(models.Messages, {
        foreignKey: "recipientId",
        as: "receivedMessages",
      });
      Users.hasMany(models.Notifications, {
        foreignKey: "userId",
        as: "notifications",
      });
      Users.hasMany(models.Payments, {
        foreignKey: "userId",
        as: "payments",
      });
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "admin", "seller"),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
    }
  );

  return Users;
};
