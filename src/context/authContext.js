import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    Children,
} from 'react'
import firebase from '../lib/firebase'
import { useDatabaseContext } from './databaseContext'

const AuthContext = createContext(null)

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const db = useDatabaseContext()
    const [currentUser, setCurrentUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    firebase.auth().onAuthStateChanged(async (user) => {
        setCurrentUser(user)
        if (user) {
            const token = await user.getIdToken()
            db.setIdToken(token)
        }
        setLoaded(true)
    })

    return (
        <AuthContext.Provider value={{currentUser: currentUser}}>
            {loaded ? children : <div>Auth Context loading...</div>}
        </AuthContext.Provider>
    )
}
