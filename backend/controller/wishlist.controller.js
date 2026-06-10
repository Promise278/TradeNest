const { Wishlists, Products } = require("../models");

async function listWishlist(req, res) {
  try {
    const items = await Wishlists.findAll({
      where: { userId: req.user.id },
      include: [{ association: "product" }],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("listWishlist:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
}

async function addWishlistItem(req, res) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const [item, created] = await Wishlists.findOrCreate({
      where: { userId: req.user.id, productId },
    });

    if (!created) {
      return res.status(200).json({
        success: true,
        data: item,
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await Wishlists.findByPk(item.id, {
      include: [{ association: "product" }],
    });

    return res.status(201).json({
      success: true,
      data: wishlistItem,
      message: "Added to wishlist",
    });
  } catch (error) {
    console.error("addWishlistItem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add wishlist item",
      error: error.message,
    });
  }
}

async function removeWishlistItem(req, res) {
  try {
    const item = await Wishlists.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    await item.destroy();

    return res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error("removeWishlistItem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove wishlist item",
      error: error.message,
    });
  }
}

module.exports = { listWishlist, addWishlistItem, removeWishlistItem };
