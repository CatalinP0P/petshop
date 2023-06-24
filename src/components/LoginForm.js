import React, { useState } from 'react'
import firebase from '../lib/firebase'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginForm({ className, closeTabs }) {
    const auth = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginWithEmail = async () => {
        console.log("Logging in")
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                setError(err.message.split('.')[0].split(':')[1])
            })
    }

    return (
        <div className={'w-full flex flex-col gap-4 ' + ` ${className}`}>
            <div className={'flex flex-col gap-1 w-full'}>
                <label className="text-sm me-1 text-gray-500 font-medium">
                    Email
                </label>
                <input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    type="email"
                    className="px-2 py-1 border border-orange-600 rounded-md outline-none"
                />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm me-1 text-gray-500 font-medium">
                    Password
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="px-2 py-1 border border-orange-600 rounded-md outline-none"
                />
            </div>

            <button
                className="bg-orange-600 px-2 py-1 mt-2 text-md text-white font-semibold hover:text-gray-200 transition-all uppercase rounded-md shadow-md"
                onClick={() => loginWithEmail()}
            >
                Login
            </button>
            <p
                className={
                    'text-red-400 text-center py-2 font-xs ' +
                    (error.length < 5 ? ' hidden' : '')
                }
            >
                {error}
            </p>
            <Link
                to={'/register'}
                onClick={closeTabs}
                className="text-orange-600 font-semibold text-center w-full underline cursor-pointer"
            >
                Create Account
            </Link>
        </div>
    )
}
