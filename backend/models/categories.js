"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.belongsTo(models.Categories, {
        foreignKey: "parentId",
        as: "parent",
      });
      Categories.hasMany(models.Categories, {
        foreignKey: "parentId",
        as: "children",
      });
      Categories.hasMany(models.Products, {
        foreignKey: "categoryId",
        as: "products",
      });
    }
  }

  Categories.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "Categories",
    }
  );

  return Categories;
};
