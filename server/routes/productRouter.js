const router = require("express").Router();
const axios = require("axios");

router.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("❌ FakeStore failed, trying DummyJSON...");
    try {
      const fallback = await axios.get("https://dummyjson.com/products");
      res.json(fallback.data.products); // Note: dummyjson wraps in .products
    } catch (error) {
      console.error("❌ DummyJSON also failed:", error.message);
      res.status(500).json({ msg: "Both APIs failed" });
    }
  }
});
router.get("/products/categories", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products/categories", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Failed to fetch categories:", err.message);
    res.status(500).json({ msg: "Error fetching categories" });
  }
});
module.exports = router;
