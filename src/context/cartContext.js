import React, { useEffect, useState, createContext, useContext } from 'react'
import { useAuth } from './authContext'
import { useDatabaseContext } from './databaseContext'

const CartContext = createContext(null)

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const auth = useAuth()
    const db = useDatabaseContext()
    const [cart, setCart] = useState([])

    const clearCart = async () => {
        updateCart([])
    }

    const getCart = async () => {
        if (auth.currentUser) {
            const token = await auth.currentUser.getIdToken()
            db.setIdToken(token)
            const cart = await db.getCart()
            setCart(cart.data.products)
        } else {
            console.log(
                'Getting the cart from local storage because no user is logged'
            )
            const localStorageCart = localStorage.getItem('cart')
            if (!localStorageCart) {
                localStorage.setItem('cart', [])
                setCart([])
            } else {
                setCart(JSON.parse(localStorageCart))
            }
        }
    }

    const updateCart = async (products) => {
        console.log(products)
        if (auth.currentUser) {
            db.updateCart(products)
        } else {
            localStorage.setItem('cart', JSON.stringify(products))
        }

        getCart()
    }

    const addToCart = async (productId) => {
        console.log('adding ' + productId)
        updateCart([...cart, productId])
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <CartContext.Provider
            value={{ cart: cart, addToCart: addToCart, clearCart: clearCart }}
        >
            {children}
        </CartContext.Provider>
    )
}
