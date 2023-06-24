import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Container from '../../components/Container'
import { useCart } from '../../context/cartContext'
import { useDatabaseContext } from '../../context/databaseContext'
import xSVG from '../../assets/xmark.svg'

export default function Cart() {
    const cartContext = useCart()
    const dbContext = useDatabaseContext()
    const [products, setProducts] = useState([])

    const fetchCartProducts = async () => {
        setProducts([])
        console.log(cartContext.cart)
        setTimeout(() => {
            cartContext.cart.forEach(async (product) => {
                const dbProduct = await dbContext.getProduct(product)
                setProducts((old) => [...old, dbProduct])
            })
        }, 125)
    }

    const removeFromCart = async (id) => {
        cartContext.removeFromCart(id)
        var newProd = []
        var removed = false
        products.forEach((product) => {
            if (!removed && product._id == id) {
                console.log('Removed ' + product.title);
                removed = true;
            } else {
                newProd.push(product)
            }
        })

        setProducts(newProd);
    }

    useEffect(() => {
        fetchCartProducts()
    }, [cartContext.loaded])

    return (
        <Container className={'px-2 md:px-0'}>
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
                    <div key={product._id}>
                        {/* Desktop version */}
                        <div className="grid-cols-6 w-full hidden md:grid relative">
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

                            <img
                                src={xSVG}
                                className="w-[32px] h-[32px] absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer"
                                onClick={(e) => removeFromCart(product._id)}
                            />
                        </div>

                        {/* Mobile version */}
                        <div className="flex flex-row w-full md:hidden border border-gray-300 my-2 p-2 rounded-md relative gap-4 ">
                            <img
                                className="w-[20%] h-full"
                                src={product.imageURL}
                            />
                            <div className="flex flex-col justify-between pe-8">
                                <p className="text-gray-600">{product.title}</p>
                                <label className="text-extrabold text-primary text-xl">
                                    {product.price}€
                                </label>
                            </div>
                            <img
                                src={xSVG}
                                className="w-[32px] h-[32px] absolute right-1 top-1 cursor-pointer"
                                onClick={(e) => removeFromCart(product._id)}
                            />
                        </div>
                    </div>
                )
            })}
        </Container>
    )
}
