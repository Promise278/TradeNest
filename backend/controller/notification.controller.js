const { Notifications } = require("../models");

async function listNotifications(req, res) {
  try {
    const notifications = await Notifications.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("listNotifications:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
}

async function markNotificationRead(req, res) {
  try {
    const notification = await Notifications.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.update({ isRead: true, readAt: new Date() });

    return res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("markNotificationRead:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update notification",
      error: error.message,
    });
  }
}

async function markAllNotificationsRead(req, res) {
  try {
    await Notifications.update(
      { isRead: true, readAt: new Date() },
      { where: { userId: req.user.id, isRead: false } }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("markAllNotificationsRead:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update notifications",
      error: error.message,
    });
  }
}

module.exports = {
  listNotifications,
  markNotificationRead,
  markAllNotificationsRead,
};
