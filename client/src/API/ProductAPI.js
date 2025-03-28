import { useEffect, useState } from "react";
import axios from "axios";

function ProductAPI() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => {
        console.log("API Response:", res.data);
        setProducts(res.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return { products };
}

export default ProductAPI;
