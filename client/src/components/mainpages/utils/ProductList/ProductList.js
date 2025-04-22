import React, { memo } from "react";
import { FixedSizeList as List } from "react-window"; 
import BtnRender from "./BtnRender";

// ProductCard component to render individual product
const ProductCard = ({ product, isAdmin, addCart }) => {
  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
      <img src={product.image} alt={product.title} loading="lazy" />
      <div className="product_box">
        <h2>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} isAdmin={isAdmin} addCart={addCart} />
    </div>
  );
};

const ProductList = ({ products, isAdmin, addCart }) => {
  const renderRow = ({ index, style }) => {
    const product = products[index];
    return (
      <div className="product_card" style={style}>
        <ProductCard product={product} isAdmin={isAdmin} addCart={addCart} />
      </div>
    );
  };

  return (
    <List
      height={500} 
      itemCount={products.length} 
      itemSize={250} 
      width={1000} 
    >
      {renderRow}
    </List>
  );
};


export default memo(ProductList);
