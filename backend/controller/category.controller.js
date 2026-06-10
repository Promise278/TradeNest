const { Categories } = require("../models");
const { slugify } = require("../utils/helpers");

async function listCategories(_req, res) {
  try {
    const categories = await Categories.findAll({
      where: { isActive: true },
      order: [["name", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    console.error("listCategories:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
}

async function createCategory(req, res) {
  try {
    const { name, description, imageUrl, parentId } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await Categories.create({
      name,
      slug: slugify(name),
      description,
      imageUrl,
      parentId: parentId || null,
    });

    return res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error("createCategory:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
}

async function getCategory(req, res) {
  try {
    const category = await Categories.findByPk(req.params.id, {
      include: [{ association: "children" }],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("getCategory:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error: error.message,
    });
  }
}

module.exports = { listCategories, createCategory, getCategory };
