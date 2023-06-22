import React, { useState } from 'react'

import Logo from '../components/Logo'
import Cart from '../assets/cart.svg'
import User from '../assets/user.svg'

const categories = ['dogs', 'cats', 'fishes', 'birds', 'rodent']

export default function Header() {
    const [myAccountTab, setMyAccountTab] = useState(false)
    const [myCartTab, setMyCartTab] = useState(false)

    const closeAllTabs = () => {
        setMyAccountTab(false)
        setMyCartTab(false)
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
                    placeholder="Search for a product"
                    className="px-4 py-2 rounded-md border-2 border-orange-600 w-full order-10 md:order-2"
                />
                <div className="flex flex-row order-3 gap-8 md:gap-16">
                    <div className="flex flex-row gap-4 order-3">
                        <img
                            src={User}
                            className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
                            onClick={(e) => {
                                e.stopPropagation()
                                closeAllTabs()
                                setMyAccountTab(!myAccountTab)
                            }}
                        />
                        <div
                            className="hidden md:flex flex-col justify-between relative"
                            onClick={(e) => {
                                e.stopPropagation()
                                closeAllTabs()
                                setMyAccountTab(!myAccountTab)
                            }}
                        >
                            <label className="text-gray-400">Welcome</label>
                            <label className="whitespace-nowrap uppercase font-extrabold text-orange-600">
                                My account
                            </label>
                            <div
                                className={
                                    'absolute right-0 w-fit px-8 py-4 z-40 shadow-md bg-white top-[65px] flex-col gap-4 ' +
                                    (myAccountTab ? ' flex' : ' hidden')
                                }
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col gap-1 w-full">
                                    <label className="text-sm me-1 text-gray-500 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="px-2 py-1 border border-orange-600 rounded-md outline-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label className="text-sm me-1 text-gray-500 font-medium">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="px-2 py-1 border border-orange-600 rounded-md outline-none"
                                    />
                                </div>

                                <button className="bg-orange-600 px-2 py-1 mt-2 text-md text-white font-semibold hover:text-gray-200 transition-all uppercase rounded-md shadow-md">
                                    Login
                                </button>
                                <label
                                    onClick={() => {}}
                                    className="text-orange-600 font-semibold text-center w-full underline cursor-pointer"
                                >
                                    Create Account
                                </label>
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
                        <div className="hidden md:flex flex-col justify-between relative">
                            <label className="text-gray-400 whitespace-nowrap">
                                1 Product
                            </label>
                            <label className="whitespace-nowrap uppercase font-extrabold text-orange-600">
                                Cart
                            </label>
                            <div
                                className={
                                    'absolute right-0 w-fit px-8 py-4 z-40 shadow-md bg-white top-[65px] flex-col gap-4 ' +
                                    (myCartTab ? ' flex' : ' hidden')
                                }
                                onClick={(e) => e.stopPropagation()}
                            >
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                    No products in Cart
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-primary py-4 md:flex hidden uppercase text-gray-50">
                <div className="max-w-[1100px] font-extrabold flex flex-row gap-8 mx-auto w-full">
                    {categories.map((cat) => {
                        return <a key={Math.random() * 1000}>{cat}</a>
                    })}
                    <a className="text-orange-600">offers</a>
                </div>
            </div>
        </div>
    )
}
