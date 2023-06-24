import React, { useCallback, useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'
import { Link } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'

import Logo from '../components/Logo'
import Cart from '../assets/cart.svg'
import User from '../assets/user.svg'
import firebase from '../lib/firebase'
import { useNavigate } from 'react-router-dom'
import CartProduct from './CartProduct'
import { useDatabaseContext } from '../context/databaseContext'

const categories = ['dog', 'cat', 'fish', 'bird', 'tarantula', 'rodent']

export default function Header() {
    const auth = useAuth()
    const navigate = useNavigate()
    const cartContext = useCart()
    const db = useDatabaseContext()

    const [myAccountTab, setMyAccountTab] = useState(false)
    const [myCartTab, setMyCartTab] = useState(false)
    const [search, setSearch] = useState('')

    const [cart, setCart] = useState([])

    const closeAllTabs = () => {
        setMyAccountTab(false)
        setMyCartTab(false)
    }

    const fetchCardProducts = async () => {
        setCart([])
        cartContext.cart.forEach(async (productId) => {
            const newProd = await db.getProduct(productId)
            setCart((old) => [...old, newProd])
        })
    }

    useEffect(() => {
        fetchCardProducts()
    }, [cartContext.cart])

    const searchProduct = () => {
        navigate('/search?q=' + search)
        window.location.reload()
    }

    return (
        <div onClick={() => closeAllTabs()}>
            <div className="hidden md:block w-full bg-gray-100 p-4">
                <div className="max-w-[1100px] mx-auto flex flex-row gap-4 justify-between items-center uppercase font-extrabold text-sm">
                    <div className="text-orange-600 flex flex-row gap-8">
                        <label className="cursor-pointer">about</label>
                        <label className="cursor-pointer">contact</label>
                        <a href="tel: (1234) 567 890">
                            <span className="text-gray-400">phone: </span>(1234)
                            567 890
                        </a>
                    </div>
                    <div />
                </div>
            </div>

            <div className="max-w-[1100px] mx-auto flex flex-row items-center gap-8 justify-between py-4 flex-wrap md:flex-nowrap">
                <Logo className={'mt-[-10px] order-1'} />
                <input
                    value={search}
                    placeholder="Search for a product"
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') searchProduct()
                    }}
                    className="px-4 py-2 rounded-md border-2 border-orange-600 w-full order-10 md:order-2"
                />
                <div className="flex flex-row order-3 gap-8 md:gap-16">
                    <div
                        className="flex flex-row gap-4 order-3"
                        onClick={(e) => {
                            e.stopPropagation()
                            closeAllTabs()
                            setMyAccountTab(!myAccountTab)
                        }}
                    >
                        <img
                            src={User}
                            className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
                        />
                        <div className="flex-col justify-between md:relative">
                            <label className="text-gray-400 hidden md:flex">
                                Welcome
                            </label>
                            <label className="hidden md:flex whitespace-nowrap uppercase font-extrabold text-orange-600">
                                My account
                            </label>
                            <div
                                className={
                                    'absolute right-4 md:right-0 left-4 md:left-auto z-40 shadow-md bg-white top-[50px] md:top-[65px] flex-col gap-4 ' +
                                    (myAccountTab ? ' flex' : ' hidden')
                                }
                                onClick={(e) => e.stopPropagation()}
                            >
                                {auth.currentUser ? (
                                    <div className="flex flex-col w-full whitespace-nowrap">
                                        <label
                                            className="px-8 py-2"
                                            onClick={() =>
                                                console.log(auth.currentUser)
                                            }
                                        >
                                            Hi,
                                            <span className="font-bold py-4">
                                                {` ${auth.currentUser.email}`}
                                            </span>
                                        </label>
                                        <label
                                            className="hover:bg-gray-100 px-8 py-2 cursor-pointer"
                                            onClick={() => {
                                                firebase.auth().signOut()
                                                window.location.reload()
                                            }}
                                        >
                                            Logout
                                        </label>
                                    </div>
                                ) : (
                                    <LoginForm
                                        closeTabs={closeAllTabs}
                                        className={'px-8 py-4'}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-row gap-4 md:me-16 xl:me-0 order-4"
                        onClick={(e) => {
                            e.stopPropagation()
                            closeAllTabs()
                            setMyCartTab(!myCartTab)
                        }}
                    >
                        <img
                            src={Cart}
                            onClick={(e) => {
                                e.stopPropagation()
                                closeAllTabs()
                                setMyCartTab(!myCartTab)
                            }}
                            className="h-[24px] md:w-[40px] md:h-[40px]"
                        />
                        <div className="md:hidden bg-primary text-white w-[20px] h-[20px] rounded-full absolute right-[15px] top-[10px] flex flex-row justify-center items-center ">
                            <label>{cartContext.cart.length}</label>
                        </div>
                        <div className="flex flex-col justify-between md:relative">
                            <label className="text-gray-400 whitespace-nowrap hidden md:flex">
                                {cartContext.cart.length}{' '}
                                {cartContext.cart.length
                                    ? 'Products'
                                    : 'Product'}
                            </label>
                            <label className="hidden md:flex whitespace-nowrap uppercase font-extrabold text-orange-600">
                                Cart
                            </label>
                            <div
                                className={
                                    'absolute md:min-w-[400px] right-4 md:right-0 left-4 md:left-auto px-8 py-4 z-40 shadow-md bg-white top-[50px] md:top-[65px] flex-col gap-4 ' +
                                    (myCartTab ? ' flex' : ' hidden')
                                }
                                onClick={(e) => e.stopPropagation()}
                            >
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                    {cartContext.cart.length ? (
                                        <>
                                            {cart.map((product) => {
                                                return (
                                                    <div
                                                        key={
                                                            Math.random() * 1000
                                                        }
                                                        className="w-full flex flex-col gap-4"
                                                    >
                                                        <CartProduct
                                                            product={product}
                                                        />
                                                    </div>
                                                )
                                            })}
                                            <div
                                                className="flex flex-col w-full justify-between items-center py-4"
                                                onClick={() => {
                                                    alert('Still working on it')
                                                }}
                                            >
                                                <div className="flex flex-row justify-between items-center w-full pb-4 text-xl">
                                                    <label className='text-gray-400' >Total : </label>
                                                    <label>
                                                        {(() => {
                                                            var total = 0
                                                            cart.forEach(
                                                                (product) => {
                                                                    total +=
                                                                        parseFloat(
                                                                            product.price
                                                                        )
                                                                }
                                                            )
                                                            return total
                                                        })()}€
                                                    </label>
                                                </div>
                                                <PrimaryButton
                                                    className={'w-full py-4'}
                                                >
                                                    Go to Cart
                                                </PrimaryButton>
                                            </div>
                                        </>
                                    ) : (
                                        <h1> No products in Cart</h1>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-primary py-4 md:flex hidden uppercase text-gray-50">
                <div className="max-w-[1100px] font-extrabold flex flex-row gap-8 mx-auto w-full">
                    {categories.map((cat) => {
                        return (
                            <a
                                className="cursor-pointer"
                                onClick={() => {
                                    navigate('/search?category=' + cat)
                                    window.location.reload()
                                }}
                                key={Math.random() * 1000}
                            >
                                {cat}
                            </a>
                        )
                    })}
                    <a className="text-orange-600">offers</a>
                </div>
            </div>
        </div>
    )
}
