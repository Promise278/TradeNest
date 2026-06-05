const { Products, Users } = require("../models");
const { Sequelize, Op } = require("sequelize");

async function create_products(req, res) {
  try {
    const { title, description, location, price, status } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    if (!title || !description || !location || !price || !status || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (including an image)",
      });
    }

    const newProduct = {
      title,
      description,
      location,
      price,
      status,
      imageUrl,
      UserId: req.user.id,
    };

    const products = await Products.create(newProduct);

    return res.status(201).json({
      success: true,
      data: products,
      message: "Product/Item added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error adding Products/Item",
      error: err.message,
    });
  }
}

async function seeAllproducts(req, res) {
  try {
    const products = await Products.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "location",
        "price",
        "status",
        "imageUrl",
        "UserId",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          as: "owner",
          attributes: ["id", "fullname", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No item/products found",
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
      message: "Products/Item retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

async function seeSingleproducts(req, res) {
  try {
    const products = await Products.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "location",
        "price",
        "status",
        "imageUrl",
        "UserId",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          as: "owner",
          attributes: ["id", "fullname", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No item/products found",
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
      message: "Products/Item retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

async function updateproducts(req, res) {
  try {
    const { id } = req.params;
    const { title, description, location, price, status, BuyerId } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    const products = await Products.findByPk(id);

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Product/Item not found",
      });
    }

    if (products.UserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this property",
      });
    }

    await products.update({
      title: title || land.title,
      description: description || land.description,
      location: location || land.location,
      price: price || land.price,
      status: status || land.status,
      imageUrl: imageUrl || land.imageUrl,
      BuyerId: BuyerId || land.BuyerId,
    });

    return res.status(200).json({
      success: true,
      data: products,
      message: "Product/Item updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

async function deleteproducts(req, res) {
  try {
    const { id } = req.params;
    const products = await Products.findByPk(id);

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Product/Item not found",
      });
    }

    if (products.UserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this property",
      });
    }

    await products.destroy();

    return res.status(200).json({
      success: true,
      data: products,
      message: "Product/Item deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

async function getuserproducts(req, res) {
  try {
    const { userId } = req.params;

    const products = await Products.findAll({
      where: {
        UserId: userId,
      },
      attributes: [
        "id",
        "title",
        "description",
        "location",
        "price",
        "status",
        "imageUrl",
        "UserId",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          as: "owner",
          attributes: ["id", "fullname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  create_products,
  seeAllproducts,
  seeSingleproducts,
  updateproducts,
  deleteproducts,
  getuserproducts,
};
