import { useEffect, useState } from "react";
import axios from "axios";

function ProductAPI() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products", { withCredentials: false })
      .then((res) => {
        console.log("API Response:", res.data);
        setProducts(res.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return { products };
}

export default ProductAPI;
