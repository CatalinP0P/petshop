import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Layout from './layout'
import { DatabaseProvider } from './context/databaseContext'
import { AuthProvider } from './context/authContext'
import { BrowserRouter, Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <DatabaseProvider>
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <App />
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    </DatabaseProvider>
)
