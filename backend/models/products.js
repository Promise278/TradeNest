"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Users, {
        foreignKey: "UserId",
        as: "owner",
      });
      Products.belongsTo(models.Users, {
        foreignKey: "sellerId",
        as: "buyer",
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
        allowNull: false,
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
      tableName: "Product",
    },
  );
  return Products;
};
