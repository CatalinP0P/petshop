import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Layout from './layout'
import { DatabaseProvider } from './context/databaseContext'
import { AuthProvider } from './context/authContext'
import { BrowserRouter, Router } from 'react-router-dom'
import { CartProvider } from './context/cartContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <DatabaseProvider>
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Layout>
                        <App />
                    </Layout>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    </DatabaseProvider>
)
