import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Container from '../../components/Container'
import { useCart } from '../../context/cartContext'
import { useDatabaseContext } from '../../context/databaseContext'

export default function Cart() {
    const cartContext = useCart()
    const dbContext = useDatabaseContext()

    const [products, setProducts] = useState([])

    const fetchCartProducts = async () => {
        setProducts([])
        cartContext.cart.forEach(async (product) => {
            const dbProduct = await dbContext.getProduct(product)
            setProducts((old) => [...old, dbProduct])
        })
    }

    useEffect(() => {
        fetchCartProducts()
    }, [cartContext.cart])

    return (
        <Container>
            <Title className="py-4">Shopping Cart</Title>
            <div className="grid-cols-6 w-full hidden md:grid">
                <label className="col-span-3 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Product
                </label>
                <label className="p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Price
                </label>
                <label className="col-span-1 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Quantity
                </label>
                <label className="col-span-1 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Total
                </label>
            </div>
            {products.map((product) => {
                return (
                    <>
                        {/* Desktop version */}
                        <div className="grid-cols-6 w-full hidden md:grid">
                            <div className="col-span-3 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full flex flex-row justify-between gap-4 items-center">
                                <img
                                    className="w-[30%] h-full object-contain"
                                    src={product.imageURL}
                                />
                                <p className="text-xs text-gray-500 font-medium w-full">
                                    {product.title}
                                </p>
                            </div>
                            <div className="p-2 border-t border-gray-400 text-gray-700 uppercase text-lg font-extrabold w-full flex items-center">
                                <label>{product.price}€</label>
                            </div>
                            <div className="p-2 border-t border-gray-400 text-gray-700 uppercase text-lg font-extrabold w-full flex items-center">
                                <label>1</label>
                            </div>
                            <div className="p-2 border-t border-gray-400 text-gray-700 uppercase text-lg font-extrabold w-full flex items-center">
                                <label>{product.price}€</label>
                            </div>
                        </div>

                        {/* Mobile version */}
                        <div></div>
                    </>
                )
            })}
        </Container>
    )
}
