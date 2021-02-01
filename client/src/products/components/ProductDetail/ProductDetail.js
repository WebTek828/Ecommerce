import React from "react";

import "./ProductDetail.css";

import ProductDetailBody from "./ProductDetailBody/ProductDetailBody";

const ProductDetail = (props) => {
  const product = props.productDetail;
  if (!product) {
    return null;
  }
  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-detail__img-container">
          <img className="product-detail__img" src={product.image} />
        </div>
        <ProductDetailBody product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
