import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Layout from './layout'
import { DatabaseProvider } from './context/databaseContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <DatabaseProvider>
        <Layout>
            <App />
        </Layout>
    </DatabaseProvider>
)
