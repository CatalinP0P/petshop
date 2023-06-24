import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import CategoryCard from '../pages/Home/CategoryCard'

const DatabaseContext = createContext(null)

export const useDatabaseContext = () => {
    return useContext(DatabaseContext)
}

export const DatabaseProvider = ({ children }) => {
    const [serverRunning, setServerState] = useState(false)
    const [products, setProducts] = useState([])
    const [bestSellers, setBestSellers] = useState([])
    const [hasToken, setHasToken] = useState(false)

    var req = axios.create({ baseURL: process.env.REACT_APP_SERVER_ADRESS })

    const setIdToken = (token) => {
        req = axios.create({
            headers: { authorization: 'Bearer ' + token },
            baseURL: process.env.REACT_APP_SERVER_ADRESS,
        })

        setHasToken(true)
    }

    const postProduct = async (product) => {
        const response = await req.post('/products', {
            title: product.title,
            price: product.price,
            description: product.description,
            imageURL: product.imageURL,
            category: product.category,
            description: product.description,
        })

        return response
    }

    const fetchProducts = () => {
        req.get('/products')
            .then((response) => {
                setProducts(response.data)
            })
            .catch((err) => {
                console.error(err)
            })

        req.get('/products/bestSelling')
            .then((response) => {
                setBestSellers(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const getProduct = async (productID) => {
        const response = await req.get('products/' + productID)
        return response.data
    }

    const pingServer = async () => {
        axios.get('/').then((response) => {
            console.log('Backend responded')
            setServerState(true)
        })
    }

    const searchProducts = async (filters) => {
        const response = await req.post('/products/search', {
            filters: filters,
        })
        return response.data
    }

    const getCart = async () => {
        if (!hasToken) return
        
        const cart = await req.get('/cart')
        return cart
    }

    const updateCart = async (products) => {
        const response = await req.post('/cart', { products: products })
        return response.data
    }

    useEffect(() => {
        pingServer()
    }, [])

    return (
        <DatabaseContext.Provider
            value={{
                serverRunning: serverRunning,
                products: products,
                bestSellers: bestSellers,
                setIdToken: setIdToken,
                fetchProducts: fetchProducts,
                postProduct: postProduct,
                searchProducts: searchProducts,
                getProduct: getProduct,

                getCart: getCart,
                updateCart: updateCart
            }}
        >
            {children}
        </DatabaseContext.Provider>
    )
}
