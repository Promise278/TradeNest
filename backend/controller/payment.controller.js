const { Payments, Orders } = require("../models");

async function listPayments(req, res) {
  try {
    const payments = await Payments.findAll({
      where: { userId: req.user.id },
      include: [{ association: "order" }],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("listPayments:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
}

async function createPayment(req, res) {
  try {
    const { orderId, amount, provider, providerReference, metadata } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: "orderId and amount are required",
      });
    }

    const order = await Orders.findOne({
      where: { id: orderId, userId: req.user.id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const payment = await Payments.create({
      orderId,
      userId: req.user.id,
      amount,
      currency: order.currency,
      provider: provider || "paystack",
      providerReference,
      status: "pending",
      metadata,
    });

    return res.status(201).json({
      success: true,
      data: payment,
      message: "Payment initiated successfully",
    });
  } catch (error) {
    console.error("createPayment:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error.message,
    });
  }
}

async function updatePaymentStatus(req, res) {
  try {
    const { status, providerReference, paidAt } = req.body;
    const allowed = ["pending", "processing", "completed", "failed", "refunded"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const payment = await Payments.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await payment.update({
      status,
      providerReference: providerReference || payment.providerReference,
      paidAt: status === "completed" ? paidAt || new Date() : payment.paidAt,
    });

    if (status === "completed") {
      await Orders.update(
        { status: "confirmed" },
        { where: { id: payment.orderId } }
      );
    }

    return res.status(200).json({
      success: true,
      data: payment,
      message: "Payment status updated",
    });
  } catch (error) {
    console.error("updatePaymentStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update payment",
      error: error.message,
    });
  }
}

module.exports = { listPayments, createPayment, updatePaymentStatus };
