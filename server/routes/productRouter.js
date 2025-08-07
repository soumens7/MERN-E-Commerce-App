const router = require("express").Router();
const axios = require("axios");

router.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://freetestapi.com/api/v1/products");
    res.json(response.data); // pass it straight to frontend
  } catch (err) {
    console.error("Failed to fetch from freetestAPI:", err.message);
    res.status(500).json({ msg: "Error fetching products" });
  }
});
router.get("/products/categories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    res.json(response.data);
  } catch (err) {
    console.error("Failed to fetch categories:", err.message);
    res.status(500).json({ msg: "Error fetching categories" });
  }
});
module.exports = router;
