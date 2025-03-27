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
    // Fetch products from the external FakeStoreAPI
    const response = await axios.get("https://fakestoreapi.com/products");
    // Return the data as JSON
    res.json(response.data);
  } catch (err) {
    // Handle errors by sending a 500 error status
    res.status(500).json({ msg: "Error fetching products" });
  }
});

module.exports = router;
