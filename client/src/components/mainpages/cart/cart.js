import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import "./cart.css";
import RazorpayCheckoutButton from "./RazorpayCheckoutButton";
function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;

  console.log("Rendering cart component with cart:", cart);

  if (cart.length === 0) {
    return <h2 className="empty-cart">Cart Empty</h2>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-count">{cart.length} item(s) in cart</div>

      {cart.map((product, index) => {
        console.log("Rendering product:", product);
        const productId = product._id || product.id;
        return (
          <div className="cart-item-container" key={productId || index}>
            <div className="details">
              <img
                src={product.image || product.images?.url}
                alt={product.title || ""}
              />
              <div className="box-details">
                <div className="row">
                  <h2>{product.title}</h2>
                  <h6>Product ID: {productId}</h6>
                </div>
                <span>${product.price}</span>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                {product.rating && (
                  <p>
                    Rating: {product.rating.rate} ({product.rating.count}{" "}
                    reviews)
                  </p>
                )}
                <Link to="/checkout" className="cart">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      {/* Razorpay Button */}
      <div className="checkout-section">
        <RazorpayCheckoutButton cart={cart} />
      </div>
    </div>
  );
}

export default Cart;
