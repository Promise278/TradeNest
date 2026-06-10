const { CartItems, Products } = require("../models");

async function listCartItems(req, res) {
  try {
    const items = await CartItems.findAll({
      where: { userId: req.user.id },
      include: [{ association: "product" }],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("listCartItems:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
      error: error.message,
    });
  }
}

async function addCartItem(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    const product = await Products.findByPk(productId);
    if (!product || product.status !== "available") {
      return res.status(404).json({
        success: false,
        message: "Product not found or unavailable",
      });
    }

    const [item, created] = await CartItems.findOrCreate({
      where: { userId: req.user.id, productId },
      defaults: { quantity },
    });

    if (!created) {
      await item.update({ quantity: item.quantity + Number(quantity) });
    }

    const cartItem = await CartItems.findByPk(item.id, {
      include: [{ association: "product" }],
    });

    return res.status(created ? 201 : 200).json({
      success: true,
      data: cartItem,
      message: created ? "Item added to cart" : "Cart quantity updated",
    });
  } catch (error) {
    console.error("addCartItem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add cart item",
      error: error.message,
    });
  }
}

async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body;
    const item = await CartItems.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    await item.update({ quantity });

    return res.status(200).json({
      success: true,
      data: item,
      message: "Cart item updated",
    });
  } catch (error) {
    console.error("updateCartItem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message,
    });
  }
}

async function deleteCartItem(req, res) {
  try {
    const item = await CartItems.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await item.destroy();

    return res.status(200).json({
      success: true,
      message: "Cart item removed",
    });
  } catch (error) {
    console.error("deleteCartItem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
      error: error.message,
    });
  }
}

module.exports = {
  listCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};
