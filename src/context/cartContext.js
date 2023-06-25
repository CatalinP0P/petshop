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
    const [loaded, setLoaded] = useState(false)

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
            const localStorageCart = localStorage.getItem('cart')
            if (!localStorageCart) {
                localStorage.setItem('cart', [])
                setCart([])
            } else {
                setCart(JSON.parse(localStorageCart))
            }
        }
        if (!loaded) {
            setLoaded(true)
        }
    }

    const updateCart = async (products) => {
        if (auth.currentUser) {
            db.updateCart(products)
        } else {
            localStorage.setItem('cart', JSON.stringify(products))
        }

        setTimeout(() => {
            getCart()
        }, 75)
    }

    const addToCart = (productId) => {
        updateCart([...cart, productId])
    }

    useEffect(() => {
        getCart()
    }, [])

    const removeFromCart = (productId) => {
        const currentCart = cart
        const index = currentCart.indexOf(productId)

        currentCart.splice(index, 1)
        updateCart(currentCart)
    }

    const sendOrder = async (adress) => {
        const userId = auth.currentUser ? auth.currentUser?.uid : null
        const orderId = await db.sendOrder(userId, cart, adress)
        console.log(orderId)
        clearCart()
        return orderId
    }

    return (
        <CartContext.Provider
            value={{
                cart: cart,
                addToCart: addToCart,
                clearCart: clearCart,
                removeFromCart: removeFromCart,
                loaded: loaded,

                sendOrder: sendOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
