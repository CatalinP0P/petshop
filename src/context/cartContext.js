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
        console.log('Getting products')
        if (auth.currentUser) {
            const token = await auth.currentUser.getIdToken()
            db.setIdToken(token)
            const cart = await db.getCart()
            console.log(cart.data.products)
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
                console.log(JSON.parse(localStorageCart))
                setCart(JSON.parse(localStorageCart))
            }
        }
        if (!loaded) {
            setLoaded(true)
            console.log('Loaded')
        }
    }

    const updateCart = async (products) => {
        console.log('updating products')
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

    return (
        <CartContext.Provider
            value={{
                cart: cart,
                addToCart: addToCart,
                clearCart: clearCart,
                removeFromCart: removeFromCart,
                loaded: loaded,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
