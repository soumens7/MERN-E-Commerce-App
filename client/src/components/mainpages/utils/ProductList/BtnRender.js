import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";


function BtnRender({product}) {
  const state = useContext(GlobalState);
  
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link id="btn_buy" to={`#!`}>
            Delete
          </Link>
          <Link id="btn_view" to={`detail/${product.id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to={`#!`} onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="btn_view" to={`detail/${product.id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
