import React, { useEffect } from 'react'
import {
    Route,
    BrowserRouter,
    Routes,
    parsePath,
    Router,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import firebase from './lib/firebase'
import { useDatabaseContext } from './context/databaseContext'
import Register from './pages/Register/Register'
import NewProduct from './pages/NewProduct/NewProduct'
import Product from './pages/Product/Product'
import Cart from './pages/Cart/Cart'
import MyOrders from './pages/MyOrders/MyOrders'

export default function App() {
    const db = useDatabaseContext()

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            const token = await user.getIdToken()
            db.setIdToken(token)
        }
    })

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/new/product" element={<NewProduct />} />
                <Route
                    path="*"
                    element={
                        <h1 className="text-6xl text-center">ERROR 404</h1>
                    }
                />
            </Routes>
        </>
    )
}
