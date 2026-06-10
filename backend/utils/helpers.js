const { v4: uuidv4 } = require("uuid");

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TN-${stamp}-${suffix}`;
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

module.exports = {
  generateOrderNumber,
  slugify,
};
