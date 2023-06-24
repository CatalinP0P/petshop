import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import Container from '../../components/Container'
import { useCart } from '../../context/cartContext'
import { useAuth } from '../../context/authContext'
import { useDatabaseContext } from '../../context/databaseContext'
import xSVG from '../../assets/xmark.svg'
import PrimaryButton from '../../components/PrimaryButton'

const deliveryServices = ['UPS', 'GLS', 'Postal']

export default function Cart() {
    const auth = useAuth()
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
                console.log('Removed ' + product.title)
                removed = true
            } else {
                newProd.push(product)
            }
        })

        setProducts(newProd)
    }

    useEffect(() => {
        fetchCartProducts()
    }, [cartContext.loaded])

    return (
        <Container className={'px-2 md:px-0 pb-8'}>
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

            <Title className={'mt-16'}>Delivery Details</Title>
            <div className="w-full h-[1px] bg-gray-400 my-4 mb-8" />

            <label className="text-xl uppercase font-extrabold text-primary">
                Delivery Service
            </label>
            <hr className="mb-2 mt-1" />
            <div className="flex flex-col gap-2 mb-8">
                {deliveryServices.map((service) => {
                    return (
                        <div key={service} className="flex flex-row gap-2">
                            <input
                                type="radio"
                                name="delivery"
                                defaultChecked={service == 'UPS' ? true : false}
                            />
                            <label>{service}</label>
                        </div>
                    )
                })}
            </div>

            <label className="text-xl uppercase font-extrabold text-primary">
                Delivery Adress
            </label>
            <hr className="mb-2 mt-1" />
            <div className="grid grid-cols-2 gap-4 pb-8">
                <div className="col-span-2 flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Full Name
                    </label>
                    <input
                        defaultValue={auth.currentUser?.displayName}
                        type="name"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        County
                    </label>
                    <select className="p-2 py-[10px] border border-gray-300 rounded-md w-full">
                        <option>-select county-</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        City
                    </label>
                    <select className="p-2 py-[10px] border border-gray-300 rounded-md w-full">
                        <option>-select city-</option>
                    </select>
                </div>

                <div className="col-span flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Adress
                    </label>
                    <input
                        type="name"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="col-span-2 flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Postal Code
                    </label>
                    <input
                        type="name"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
            </div>

            <label className="text-xl uppercase font-extrabold text-primary mt-16">
                Contact Details
            </label>
            <hr className="mb-2 mt-1" />
            <div className="grid grid-cols-2 gap-4 pb-8">
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Email
                    </label>
                    <input
                        defaultValue={auth.currentUser?.email}
                        type="email"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Phone Number
                    </label>
                    <input
                        defaultValue={auth.currentUser?.phoneNumber}
                        type="phone"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="col-span-2 flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Any Details ( optional )
                    </label>
                    <textarea className="p-2 border border-gray-300 rounded-md w-full min-h-[100px]" />
                </div>
            </div>

            <div className="flex flex-col gap-1 pb-4">
                {products.map((prod) => {
                    return (
                        <label
                            key={prod._id}
                            className="text-gray-600 text-md"
                        >
                            1 x {prod.title}:{' '}
                            <span className="text-black font-extrabold">
                                {prod.price}€
                            </span>
                        </label>
                    )
                })}
            </div>

            <div className="flex flex-col gap-2 pb-8">
                <hr />
                <label className="font-extrabold text-primary uppercase text-3xl">
                    Total:{' '}
                    {(() => {
                        var total = 0
                        products.forEach((prod) => {
                            total += parseFloat(prod.price)
                        })

                        return total.toFixed(2)
                    })()}
                    €
                </label>
                <hr />
            </div>

            <label className="text-xl uppercase font-extrabold text-primary">
                Sign to our newsletter?
            </label>
            <hr className="mb-2 mt-1" />
            <div className="flex flex-row items-start gap-4 pb-8">
                <input type="checkbox" className="mt-[6px]" />

                <label>
                    I have read and I agree with the collection and processing
                    of my personal data together with the terms and conditions
                    of the store. By subscribing to the newsletter, I confirm
                    that I am over 16 years old.
                </label>
            </div>

            <PrimaryButton>Send Order</PrimaryButton>
        </Container>
    )
}
