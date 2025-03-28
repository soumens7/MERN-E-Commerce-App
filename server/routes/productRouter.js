const router = require("express").Router();
//const productControl = require("../controllers/productControl");
const axios = require("axios");
// router
//   .route("/products")
//   .get(productControl.getProducts)
//   .post(productControl.createProduct);

// router
//   .route("/products/:id")
//   .delete(productControl.deleteProduct)
//   .put(productControl.updateProduct);

router.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data); // pass it straight to frontend
  } catch (err) {
    console.error("Failed to fetch from FakeStoreAPI:", err.message);
    res.status(500).json({ msg: "Error fetching products" });
  }
});

module.exports = router;
