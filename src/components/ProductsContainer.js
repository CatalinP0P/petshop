import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsContainer({ className, products }) {
  return (
    <div
      className={
        "w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4" +
        ` ${className}`
      }
    >
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id || Math.random() * 1000}
            product={product}
          />
        );
      })}
    </div>
  );
}
