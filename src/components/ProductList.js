import React from "react";

const ProductList = ({ products, onDelete }) => {
  if (products.length === 0) {
    return <div className="no-products">No Products Found</div>;
  }

  return (
    <div className="product-list">
      <h3>Products</h3>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-price">₹{product.price}</span>
            <button onClick={() => onDelete(product)} className="delete-btn">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
