const {
  Orders,
  OrderItems,
  Products,
  CartItems,
  Addresses,
  sequelize,
} = require("../models");
const { generateOrderNumber } = require("../utils/helpers");

async function listOrders(req, res) {
  try {
    const orders = await Orders.findAll({
      where: { userId: req.user.id },
      include: [
        { association: "items", include: [{ association: "product" }] },
        { association: "shippingAddress" },
        { association: "payments" },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("listOrders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}

async function getOrder(req, res) {
  try {
    const order = await Orders.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [
        { association: "items", include: [{ association: "product" }] },
        { association: "shippingAddress" },
        { association: "payments" },
      ],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("getOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
}

async function createOrder(req, res) {
  const transaction = await sequelize.transaction();

  try {
    const { addressId, notes, useCart = true, items = [] } = req.body;

    if (!addressId) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "addressId is required",
      });
    }

    const address = await Addresses.findOne({
      where: { id: addressId, userId: req.user.id },
      transaction,
    });

    if (!address) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Shipping address not found",
      });
    }

    let orderLines = items;

    if (useCart) {
      const cartItems = await CartItems.findAll({
        where: { userId: req.user.id },
        include: [{ association: "product" }],
        transaction,
      });

      if (cartItems.length === 0 && orderLines.length === 0) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }

      if (cartItems.length > 0) {
        orderLines = cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
      }
    }

    if (orderLines.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "No order items provided",
      });
    }

    let subtotal = 0;
    const preparedItems = [];

    for (const line of orderLines) {
      const product = await Products.findByPk(line.productId, { transaction });

      if (!product || product.status !== "available") {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Product ${line.productId} is unavailable`,
        });
      }

      const quantity = Number(line.quantity) || 1;
      if (product.stock < quantity) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const unitPrice = Number(product.price);
      const totalPrice = unitPrice * quantity;
      subtotal += totalPrice;

      preparedItems.push({
        productId: product.id,
        sellerId: product.sellerId,
        quantity,
        unitPrice,
        totalPrice,
      });
    }

    const shippingFee = Number(req.body.shippingFee) || 0;
    const tax = Number(req.body.tax) || 0;
    const total = subtotal + shippingFee + tax;

    const order = await Orders.create(
      {
        userId: req.user.id,
        addressId,
        orderNumber: generateOrderNumber(),
        status: "pending",
        subtotal,
        shippingFee,
        tax,
        total,
        currency: req.body.currency || "NGN",
        notes,
      },
      { transaction }
    );

    for (const line of preparedItems) {
      await OrderItems.create(
        {
          orderId: order.id,
          ...line,
        },
        { transaction }
      );

      await Products.decrement("stock", {
        by: line.quantity,
        where: { id: line.productId },
        transaction,
      });
    }

    if (useCart) {
      await CartItems.destroy({
        where: { userId: req.user.id },
        transaction,
      });
    }

    await transaction.commit();

    const createdOrder = await Orders.findByPk(order.id, {
      include: [
        { association: "items", include: [{ association: "product" }] },
        { association: "shippingAddress" },
      ],
    });

    return res.status(201).json({
      success: true,
      data: createdOrder,
      message: "Order placed successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("createOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const allowed = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Orders.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.update({ status });

    return res.status(200).json({
      success: true,
      data: order,
      message: "Order status updated",
    });
  } catch (error) {
    console.error("updateOrderStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
}

module.exports = {
  listOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
};
