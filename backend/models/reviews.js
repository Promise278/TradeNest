"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    static associate(models) {
      Reviews.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "reviewer",
      });
      Reviews.belongsTo(models.Products, {
        foreignKey: "productId",
        as: "product",
      });
      Reviews.belongsTo(models.Orders, {
        foreignKey: "orderId",
        as: "order",
      });
    }
  }

  Reviews.init(
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
      orderId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isVerifiedPurchase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Reviews",
      tableName: "Reviews",
      indexes: [
        {
          unique: true,
          fields: ["userId", "productId"],
        },
      ],
    }
  );

  return Reviews;
};
