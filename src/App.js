import React, { useEffect } from 'react'
import {
    Route,
    BrowserRouter,
    Routes,
    parsePath,
    Router,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import firebase from './lib/firebase'
import { useDatabaseContext } from './context/databaseContext'
import Register from './pages/Register/Register'

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
