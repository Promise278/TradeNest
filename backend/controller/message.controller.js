const { Messages, Users } = require("../models");
const { Op } = require("sequelize");

async function listMessages(req, res) {
  try {
    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          { senderId: req.user.id },
          { recipientId: req.user.id },
        ],
      },
      include: [
        { model: Users, as: "sender", attributes: ["id", "name", "email"] },
        { model: Users, as: "recipient", attributes: ["id", "name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("listMessages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
}

async function sendMessage(req, res) {
  try {
    const { recipientId, content, productId, orderId } = req.body;

    if (!recipientId || !content) {
      return res.status(400).json({
        success: false,
        message: "recipientId and content are required",
      });
    }

    if (recipientId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot message yourself",
      });
    }

    const recipient = await Users.findByPk(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "Recipient not found",
      });
    }

    const message = await Messages.create({
      senderId: req.user.id,
      recipientId,
      content,
      productId: productId || null,
      orderId: orderId || null,
    });

    return res.status(201).json({
      success: true,
      data: message,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("sendMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
}

async function markMessageRead(req, res) {
  try {
    const message = await Messages.findOne({
      where: { id: req.params.id, recipientId: req.user.id },
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await message.update({ isRead: true, readAt: new Date() });

    return res.status(200).json({
      success: true,
      data: message,
      message: "Message marked as read",
    });
  } catch (error) {
    console.error("markMessageRead:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update message",
      error: error.message,
    });
  }
}

module.exports = { listMessages, sendMessage, markMessageRead };
