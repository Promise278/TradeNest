"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    static associate(models) {
      Addresses.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
      Addresses.hasMany(models.Orders, {
        foreignKey: "addressId",
        as: "orders",
      });
    }
  }

  Addresses.init(
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
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Home",
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NG",
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Addresses",
      tableName: "Addresses",
    }
  );

  return Addresses;
};
