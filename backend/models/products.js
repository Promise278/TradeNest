"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Users, {
        foreignKey: "sellerId",
        as: "seller",
      });
      Products.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "categoryRef",
      });
      Products.hasMany(models.OrderItems, {
        foreignKey: "productId",
        as: "orderItems",
      });
      Products.hasMany(models.CartItems, {
        foreignKey: "productId",
        as: "cartItems",
      });
      Products.hasMany(models.Wishlists, {
        foreignKey: "productId",
        as: "wishlists",
      });
      Products.hasMany(models.Reviews, {
        foreignKey: "productId",
        as: "reviews",
      });
      Products.hasMany(models.Messages, {
        foreignKey: "productId",
        as: "messages",
      });
    }
  }

  Products.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      sellerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      condition: {
        type: DataTypes.ENUM("new", "used", "refurbished"),
        defaultValue: "new",
      },
      location: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("available", "sold", "inactive"),
        defaultValue: "available",
      },
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "Products",
    }
  );

  return Products;
};
