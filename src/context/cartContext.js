import React, { useEffect, useState, createContext, useContext } from 'react'
import { useAuth } from './authContext'

const CartContext = createContext(null)

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const auth = useAuth()
    const [cart, setCart] = useState([])

    const getCart = async () => {
        if (auth.currentUser) {
            console.log('Getting the cart from db because the a user is logged')
        } else {
            console.log(
                'Getting the cart from local storage because no user is logged'
            )

            const localStorageCart = localStorage.getItem('cart')
            if (localStorageCart) setCart(localStorageCart)
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        if (auth.currentUser) {
            console.log('Updating from db')
        } else {
            console.log('Updating local storage')
        }
    }, [cart])

    return (
        <CartContext.Provider value={{ cart: cart }}>
            {children}
        </CartContext.Provider>
    )
}
