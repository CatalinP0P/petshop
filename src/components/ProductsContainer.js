import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsContainer({ className, products }) {
    return (
        <div
            className={
                'w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4' +
                ` ${className}`
            }
        >
            {products.map((product) => {
                return (
                    <div key={Math.random() * 1000}>
                        <ProductCard product={product} />
                    </div>
                )
            })}
        </div>
    )
}
