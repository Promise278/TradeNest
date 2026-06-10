const { Addresses } = require("../models");

async function listAddresses(req, res) {
  try {
    const addresses = await Addresses.findAll({
      where: { userId: req.user.id },
      order: [
        ["isDefault", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    return res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("listAddresses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
}

async function createAddress(req, res) {
  try {
    const {
      label,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode) {
      return res.status(400).json({
        success: false,
        message: "Required address fields are missing",
      });
    }

    if (isDefault) {
      await Addresses.update(
        { isDefault: false },
        { where: { userId: req.user.id } }
      );
    }

    const address = await Addresses.create({
      userId: req.user.id,
      label: label || "Home",
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country: country || "NG",
      isDefault: Boolean(isDefault),
    });

    return res.status(201).json({
      success: true,
      data: address,
      message: "Address created successfully",
    });
  } catch (error) {
    console.error("createAddress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create address",
      error: error.message,
    });
  }
}

async function updateAddress(req, res) {
  try {
    const address = await Addresses.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (req.body.isDefault) {
      await Addresses.update(
        { isDefault: false },
        { where: { userId: req.user.id } }
      );
    }

    await address.update(req.body);

    return res.status(200).json({
      success: true,
      data: address,
      message: "Address updated successfully",
    });
  } catch (error) {
    console.error("updateAddress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update address",
      error: error.message,
    });
  }
}

async function deleteAddress(req, res) {
  try {
    const address = await Addresses.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    await address.destroy();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("deleteAddress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete address",
      error: error.message,
    });
  }
}

module.exports = {
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
