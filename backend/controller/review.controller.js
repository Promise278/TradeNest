const { Reviews, Products } = require("../models");

async function listProductReviews(req, res) {
  try {
    const reviews = await Reviews.findAll({
      where: { productId: req.params.productId },
      include: [{ association: "reviewer", attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("listProductReviews:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
}

async function createReview(req, res) {
  try {
    const { productId, orderId, rating, title, comment } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({
        success: false,
        message: "productId and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = await Reviews.create({
      userId: req.user.id,
      productId,
      orderId: orderId || null,
      rating,
      title,
      comment,
      isVerifiedPurchase: Boolean(orderId),
    });

    return res.status(201).json({
      success: true,
      data: review,
      message: "Review submitted successfully",
    });
  } catch (error) {
    console.error("createReview:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
}

async function deleteReview(req, res) {
  try {
    const review = await Reviews.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.destroy();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("deleteReview:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
}

module.exports = { listProductReviews, createReview, deleteReview };
