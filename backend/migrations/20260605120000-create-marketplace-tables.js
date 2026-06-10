"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "Categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addColumn("Products", "categoryId", {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: "Categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Home",
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressLine1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "NG",
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      addressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Addresses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM(
          "pending",
          "confirmed",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
          "refunded"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      subtotal: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      shippingFee: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: "NGN",
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      placedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("OrderItems", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      sellerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unitPrice: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("CartItems", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("CartItems", ["userId", "productId"], {
      unique: true,
      name: "cart_items_user_product_unique",
    });

    await queryInterface.createTable("Wishlists", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("Wishlists", ["userId", "productId"], {
      unique: true,
      name: "wishlists_user_product_unique",
    });

    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "Orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isVerifiedPurchase: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("Reviews", ["userId", "productId"], {
      unique: true,
      name: "reviews_user_product_unique",
    });

    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      senderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      recipientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "Products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "Orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      readAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM(
          "order",
          "message",
          "payment",
          "review",
          "system"
        ),
        allowNull: false,
        defaultValue: "system",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      readAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: "NGN",
      },
      provider: {
        type: Sequelize.ENUM(
          "paystack",
          "flutterwave",
          "stripe",
          "cash",
          "bank_transfer"
        ),
        allowNull: false,
        defaultValue: "paystack",
      },
      providerReference: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          "pending",
          "processing",
          "completed",
          "failed",
          "refunded"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      paidAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Payments");
    await queryInterface.dropTable("Notifications");
    await queryInterface.dropTable("Messages");
    await queryInterface.dropTable("Reviews");
    await queryInterface.dropTable("Wishlists");
    await queryInterface.dropTable("CartItems");
    await queryInterface.dropTable("OrderItems");
    await queryInterface.dropTable("Orders");
    await queryInterface.dropTable("Addresses");
    await queryInterface.removeColumn("Products", "categoryId");
    await queryInterface.dropTable("Categories");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Orders_status";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Notifications_type";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Payments_provider";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Payments_status";'
    );
  },
};
