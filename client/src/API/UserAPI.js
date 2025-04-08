import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(`${API_URL}/user/infor`, {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          console.log("User Info:", res.data);
          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying");

    // Log the current cart for debugging
    console.log("Current cart before adding:", cart);
    console.log("Product being added:", product);

    // Make sure we're consistent with ID properties (some APIs use _id, others use id)
    const productId = product._id || product.id;

    // Check if product is already in cart
    const existingProduct = cart.find(
      (item) => (item._id || item.id) === productId
    );

    if (!existingProduct) {
      // Add product to cart with consistent ID property
      const newProduct = {
        ...product,
        quantity: 1,
        // Ensure we have both ID properties for consistency
        _id: product._id || product.id,
        id: product.id || product._id,
      };

      const updatedCart = [...cart, newProduct];
      console.log("Updated cart:", updatedCart);
      setCart(updatedCart);

      await axios.patch(
        "/user/addtocart",
        { cart: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      alert("This product has been added to cart.");
    }
  };
  const removeFromCart = async (productId) => {
    const newCart = cart.filter(
      (item) => (item._id || item.id) !== (productId._id || productId.id)
    );

    setCart(newCart);

    try {
      await axios.patch(
        "/user/addtocart", // reuse same backend route
        { cart: newCart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("❌ Failed to update cart:", err);
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    removeFromCart: removeFromCart,
  };
}

export default UserAPI;
