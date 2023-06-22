import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'

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

    const fetchProducts = () => {
        req.get('/products')
            .then((response) => {
                setProducts(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const pingServer = async () => {
        axios.get('/').then((response) => {
            console.log('Backend responded')
            setServerState(true)
        })
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
            }}
        >
            {children}
        </DatabaseContext.Provider>
    )
}
