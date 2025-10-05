// server/routes/products.js
const router = require("express").Router();
const axios = require("axios");

// All products (limited)
router.get("/products", async (req, res) => {
  const { category } = req.query;
  try {
    const url = category
      ? `https://dummyjson.com/products/category/${encodeURIComponent(
          category
        )}?limit=100`
      : `https://dummyjson.com/products?limit=100`;

    const { data } = await axios.get(url);
    res.json(data.products || data);
  } catch (e) {
    res.status(500).json({ msg: "DummyJSON failed" });
  }
});

// Categories (slugs)
router.get("/products/categories", async (_req, res) => {
  try {
    const { data } = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    // data is an array of slugs like "smartphones", "mens-shirts", ...
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Error fetching categories" });
  }
});

module.exports = router;
