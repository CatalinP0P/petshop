import React from 'react'
import cart from '../assets/cart-white.svg'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext'

export default function ProductCard({ product, onClick }) {
    const navigate = useNavigate()
    const cartContext = useCart()

    const addToCart = async (id) => {
        const response = await cartContext.addToCart(id)
    }

    const addToLocalStorage = (id) => {
        var recenltyVisitedIds = localStorage.getItem('recentlyVisited')

        if (recenltyVisitedIds) {
            recenltyVisitedIds = JSON.parse(recenltyVisitedIds)
            if (recenltyVisitedIds.indexOf(id) == -1)
                recenltyVisitedIds.push(id)
            if ( recenltyVisitedIds.length > 5 )
                recenltyVisitedIds.shift();
        } else {
            recenltyVisitedIds = [id]
        }

        localStorage.setItem(
            'recentlyVisited',
            JSON.stringify(recenltyVisitedIds)
        )
    }

    return (
        <div
            className="border-2 border-gray-100  rounded-md px-[24px] py-[32px] flex flex-col gap-4 h-full cursor-pointer hover:border-orange-600"
            onClick={() => {
                addToLocalStorage(product._id)
                navigate('/product/' + product._id)
                window.location.reload()
            }}
        >
            <div className="w-full h-0 pb-[75%] relative productCard">
                <img
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    src={product.imageURL}
                />
                <div
                    id="addToCart"
                    className="flex absolute left-[50%] top-[50%] translate-x-[-50%] w-full translate-y-[-50%] items-center justify-between gap-1 text-white cursor-pointer "
                    onClick={(e) => {
                        const isMobile = /iPhone|iPad|iPod|Android/i.test(
                            window.navigator.userAgent
                        )
                        if (!isMobile) {
                            addToCart(product._id)
                            e.stopPropagation()
                        }
                    }}
                >
                    <img
                        src={cart}
                        className="w-[32px] h-[32px] p-1 bg-primary rounded-md cursor-pointer "
                    />
                    <label className="flex flex-row h-[32px] px-4 bg-orange-600 rounded-md items-center justify-center w-full cursor-pointer ">
                        Add to Cart
                    </label>
                </div>
            </div>
            <div className="flex flex-col justify-between h-full gap-4">
                <p className="text-md md:text-sm">{product.title}</p>
                <p className="text-xl font-bold text-primary">
                    {product.price}€
                </p>
            </div>
        </div>
    )
}
