import React, { useState } from 'react'
import Container from '../../components/Container'
import PrimaryButton from '../../components/PrimaryButton'
import firebase from '../../lib/firebase'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [name, setName] = useState('')

    const [error, setError] = useState('')

    const createAccount = async () => {
        if (rePassword != password) return setError('Passwords do not match')

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firebase.auth().currentUser.updateProfile({
                    displayName: name,
                })
                navigate('/')
            })
            .catch((err) => {
                console.log(err.message)
                setError(err.message.split('.')[0])
            })
    }

    return (
        <Container className={'px-4 lg:px-0'}>
            <div className="flex flex-col lg:flex-row gap-4 py-6 text-gray-800">
                <div className="w-fit h-fit flex flex-col p-4 gap-2 uppercase text-xs border border-gray-400 rounded-md">
                    <label className="text-lg font-extrabold text-gray-700">
                        PetShop.com
                    </label>
                    <hr className="py-2" />
                    <label>about us</label>
                    <label>terms & conditions</label>
                    <label>Privacy Policy</label>
                    <label>Fidelity Points</label>
                    <label>Cookie Policy</label>

                    <label className="text-lg font-extrabold text-gray-700 pt-8">
                        Order & Delivery
                    </label>
                    <hr className="py-2" />
                    <label>How to order</label>
                    <label>how to pay</label>
                    <label>How it delivers</label>
                    <label>How to Refund</label>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <label className="font-extrabold uppercase text-3xl whitespace-nowrap">
                        creating a new account
                    </label>
                    <hr className="my-2" />
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-gray-400">
                            First and Last Name
                        </label>
                        <input
                            className={inputStyle}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-gray-400">Email</label>
                        <input
                            className={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-gray-400">Password</label>
                        <input
                            type="password"
                            className={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-gray-400">Retype Password</label>
                        <input
                            type="password"
                            className={inputStyle}
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>

                    <label className="font-semibold text-2xl">
                        Want to receive our offers?
                    </label>
                    <p>
                        We will periodically send you news and promotions
                        related to our store via email.
                    </p>
                    <div className="flex flex-row w-full gap-4 items-start">
                        <input type="checkbox" className="mt-1" />
                        <p className="text-sm text-gray-400">
                            I have read and agree to the collection and
                            processing of my personal data, along with the terms
                            and conditions of the store. By subscribing to the
                            newsletter, I confirm that I am over 16 years old.
                        </p>
                    </div>

                    <PrimaryButton className="mt-8" onClick={createAccount}>
                        Create Account
                    </PrimaryButton>
                    <p className="w-full text-red-400 text-md">{error}</p>
                </div>

                <div className="w-fit">
                    <label className="font-extrabold uppercase text-3xl whitespace-nowrap">
                        why have an account
                    </label>
                    <hr className="my-6" />
                    <p>
                        Creating an account simplifies the ordering process.
                        From your account, you can easily track the status of
                        deliveries as well as the details of previous orders. In
                        addition, you benefit from exclusive offers and
                        promotions for registered customers.
                    </p>
                </div>
            </div>
        </Container>
    )
}

const inputStyle = 'p-2 border border-gray-400 rounded-md outline-none'
