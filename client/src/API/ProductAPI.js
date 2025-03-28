import { useEffect, useState } from "react";
import axios from "axios";
import publicAxios from "../utils/publicAxios";

function ProductAPI() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    publicAxios
      .get("/api/products") // ✅ no credentials sent
      .then((res) => {
        console.log("Product API Response:", res.data);
        setProducts(res.data);
      })
      .catch((error) =>
        console.error("Error fetching products:", error.response?.data || error)
      );
  }, []);

  return { products };
}

export default ProductAPI;
