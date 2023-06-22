import React, { useEffect } from 'react'
import { Route, BrowserRouter, Routes, parsePath } from 'react-router-dom'
import Home from './pages/Home/Home'
import firebase from './lib/firebase'
import { useDatabaseContext } from './context/databaseContext'

export default function App() {
    const db = useDatabaseContext()

    firebase.auth().onAuthStateChanged(async (user) => {
        console.log('called')
        if (user) {
            const token = await user.getIdToken()
            db.setIdToken(token)
        }
    })

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
