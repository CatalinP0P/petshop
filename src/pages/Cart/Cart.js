import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Title from '../../components/Title'
import Container from '../../components/Container'
import Invoice from '../Invoice'
import { useCart } from '../../context/cartContext'
import { useAuth } from '../../context/authContext'
import { useDatabaseContext } from '../../context/databaseContext'
import xSVG from '../../assets/xmark.svg'
import easyinvoice from 'easyinvoice'
import PrimaryButton from '../../components/PrimaryButton'

const deliveryServices = ['UPS', 'GLS', 'Postal']

export default function Cart() {
    const auth = useAuth()
    const cartContext = useCart()
    const dbContext = useDatabaseContext()
    const [products, setProducts] = useState([])

    const [counties, setCounties] = useState([])
    const [cities, setCities] = useState([])

    const [adress, setAdress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [email, setEmail] = useState(auth.currentUser?.email)
    const [details, setDetails] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [fullName, setFullName] = useState(auth.currentUser?.displayName)

    const cityRef = useRef()
    const countyRef = useRef()

    const [invoicePDF, setInvoicePDF] = useState()

    const sendOrder = async () => {
        if (
            postalCode == '' ||
            email == '' ||
            adress == '' ||
            fullName == '' ||
            postalCode == '' ||
            countyRef.current.value == '-select county-' ||
            cityRef.current.value == '-select city-'
        ) {
            return alert('All fields are required')
        }

        const x = await cartContext.sendOrder({
            county: countyRef.current.value,
            city: cityRef.current.value,
            street: adress,
            postalCode: postalCode,
            fullName: fullName,
            details: details,
            email: email,
            phoneNumber: phoneNumber,
        })

        createInvoice(x)
    }

    const getInvoiceProducts = async (order) => {
        var invoiceProducts = []
        for (var i = 0; i < order.products.length; i++) {
            const prodDb = await dbContext.getProduct(order.products[i])
            console.log(prodDb)
            invoiceProducts.push({
                quantity: 1,
                description: prodDb.title,
                price: prodDb.price,
            })
        }

        return invoiceProducts
    }

    const createInvoice = async (orderId) => {
        const order = await dbContext.getOrder(orderId)
        console.log(order.products)

        const invoiceProducts = await getInvoiceProducts(order)
        console.log(invoiceProducts)

        var data = {
            customize: {},
            images: {
                logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png',
            },
            sender: {
                company: 'PetShop',
                address: 'Sample Street 123',
                zip: '1234 AB',
                city: 'Sampletown',
                country: 'Samplecountry',
                //"custom1": "custom value 1",
            },
            client: {
                address: order.adress.street,
                zip: order.adress.postalCode,
                city: order.adress.city,
                country: order.adress.county,
            },
            information: {
                number: order._id,
                date: order.createdAt,
            },
            products: invoiceProducts,
            'bottom-notice': 'Thanks for ordering.',
            settings: {
                currency: 'EUR',
            },
            translate: {},
        }

        //Create your invoice! Easy!
        easyinvoice.createInvoice(data, function (result) {
            console.log('PDF base64 string: ', result.pdf)
            setInvoicePDF(result.pdf)
        })
    }

    const fetchCartProducts = async () => {
        setProducts([])
        setTimeout(() => {
            cartContext.cart.forEach(async (product) => {
                const dbProduct = await dbContext.getProduct(product)
                setProducts((old) => [...old, dbProduct])
            })
        }, 125)
    }

    const handleCountyChange = async (e) => {
        const county = e.target.value
        const auto = counties.find((m) => m.nume == county)?.auto
        if (!auto) return

        getCities(auto)
    }

    const getCities = (countyAuto) => {
        axios
            .get('https://roloca.coldfuse.io/orase/' + countyAuto)
            .then((response) => {
                setCities(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const getCounties = async () => {
        axios
            .get('https://roloca.coldfuse.io/judete')
            .then((response) => {
                setCounties(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const removeFromCart = async (id) => {
        cartContext.removeFromCart(id)
        var newProd = []
        var removed = false
        products.forEach((product) => {
            if (!removed && product._id == id) {
                console.log('Removed ' + product.title)
                removed = true
            } else {
                newProd.push(product)
            }
        })

        setProducts(newProd)
    }

    useEffect(() => {
        fetchCartProducts()
    }, [cartContext.loaded])

    useEffect(() => {
        getCounties()
    }, [])

    return invoicePDF ? (
        <Container>
            <Invoice invoicePDF={invoicePDF} />
        </Container>
    ) : (
        <Container className={'px-2 md:px-0 pb-8'}>
            <Title className="py-4">Shopping Cart</Title>
            <div className="grid-cols-6 w-full hidden md:grid">
                <label className="col-span-3 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Product
                </label>
                <label className="p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Price
                </label>
                <label className="col-span-1 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Quantity
                </label>
                <label className="col-span-1 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full">
                    Total
                </label>
            </div>
            {products.map((product) => {
                return (
                    <div key={product._id}>
                        {/* Desktop version */}
                        <div className="grid-cols-6 w-full hidden md:grid relative">
                            <div className="col-span-3 p-2 border-t border-gray-400 text-gray-400 uppercase text-sm font-extrabold w-full flex flex-row justify-between gap-4 items-center">
                                <img
                                    className="w-[30%] h-full object-contain"
                                    src={product.imageURL}
                                />
                                <p className="text-xs text-gray-500 font-medium w-full">
                                    {product.title}
                                </p>
                            </div>
                            <div className="p-2 border-t border-gray-400 text-gray-700 uppercase text-lg font-extrabold w-full flex items-center">
                                <label>{product.price}€</label>
                            </div>
                            <div className="p-2 border-t border-gray-400 text-gray-700 uppercase text-lg font-extrabold w-full flex items-center">
                                <label>1</label>
                            </div>
                            <div className="p-2 border-t border-gray-400 text-gray-700 uppercase text-lg font-extrabold w-full flex items-center">
                                <label>{product.price}€</label>
                            </div>

                            <img
                                src={xSVG}
                                className="w-[32px] h-[32px] absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer"
                                onClick={(e) => removeFromCart(product._id)}
                            />
                        </div>

                        {/* Mobile version */}
                        <div className="flex flex-row w-full md:hidden border border-gray-300 my-2 p-2 rounded-md relative gap-4 ">
                            <img
                                className="w-[20%] h-full"
                                src={product.imageURL}
                            />
                            <div className="flex flex-col justify-between pe-8">
                                <p className="text-gray-600">{product.title}</p>
                                <label className="text-extrabold text-primary text-xl">
                                    {product.price}€
                                </label>
                            </div>
                            <img
                                src={xSVG}
                                className="w-[32px] h-[32px] absolute right-1 top-1 cursor-pointer"
                                onClick={(e) => removeFromCart(product._id)}
                            />
                        </div>
                    </div>
                )
            })}

            <Title className={'mt-16'}>Delivery Details</Title>
            <div className="w-full h-[1px] bg-gray-400 my-4 mb-8" />

            <label className="text-xl uppercase font-extrabold text-primary">
                Delivery Service
            </label>
            <hr className="mb-2 mt-1" />
            <div className="flex flex-col gap-2 mb-8">
                {deliveryServices.map((service) => {
                    return (
                        <div key={service} className="flex flex-row gap-2">
                            <input
                                type="radio"
                                name="delivery"
                                defaultChecked={service == 'UPS' ? true : false}
                            />
                            <label>{service}</label>
                        </div>
                    )
                })}
            </div>

            <label className="text-xl uppercase font-extrabold text-primary">
                Delivery Adress
            </label>
            <hr className="mb-2 mt-1" />
            <div className="grid grid-cols-2 gap-4 pb-8">
                <div className="col-span-2 flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Full Name
                    </label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="name"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        County
                    </label>
                    <select
                        ref={countyRef}
                        className="p-2 py-[10px] border border-gray-300 rounded-md w-full"
                        onChange={handleCountyChange}
                    >
                        <option>-select county-</option>
                        {counties.map((county) => {
                            return (
                                <option
                                    key={county.auto}
                                    data-auto={county.auto}
                                >
                                    {county.nume}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        City
                    </label>
                    <select
                        className="p-2 py-[10px] border border-gray-300 rounded-md w-full"
                        ref={cityRef}
                    >
                        <option>-select city-</option>
                        {cities.map((city) => {
                            return (
                                <option key={Math.random() * 10000}>
                                    {city.nume}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="col-span flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Adress
                    </label>
                    <input
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        type="name"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="col-span-2 flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Postal Code
                    </label>
                    <input
                        type="name"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
            </div>

            <label className="text-xl uppercase font-extrabold text-primary mt-16">
                Contact Details
            </label>
            <hr className="mb-2 mt-1" />
            <div className="grid grid-cols-2 gap-4 pb-8">
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(email)}
                        type="email"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Phone Number
                    </label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="phone"
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="col-span-2 flex flex-col gap-1 w-full">
                    <label className="text-gray-600 text-sm font-semibold">
                        Any Details ( optional )
                    </label>
                    <textarea
                        className="p-2 border border-gray-300 rounded-md w-full min-h-[100px]"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1 pb-4">
                {products.map((prod) => {
                    return (
                        <label key={prod._id} className="text-gray-600 text-md">
                            1 x {prod.title}:{' '}
                            <span className="text-black font-extrabold">
                                {prod.price}€
                            </span>
                        </label>
                    )
                })}
            </div>

            <div className="flex flex-col gap-2 pb-8">
                <hr />
                <label className="font-extrabold text-primary uppercase text-3xl">
                    Total:{' '}
                    {(() => {
                        var total = 0
                        products.forEach((prod) => {
                            total += parseFloat(prod.price)
                        })

                        return total.toFixed(2)
                    })()}
                    €
                </label>
                <hr />
            </div>

            <label className="text-xl uppercase font-extrabold text-primary">
                Sign to our newsletter?
            </label>
            <hr className="mb-2 mt-1" />
            <div className="flex flex-row items-start gap-4 pb-8">
                <input type="checkbox" className="mt-[6px]" />

                <label>
                    I have read and I agree with the collection and processing
                    of my personal data together with the terms and conditions
                    of the store. By subscribing to the newsletter, I confirm
                    that I am over 16 years old.
                </label>
            </div>

            <PrimaryButton onClick={() => sendOrder()}>
                Send Order
            </PrimaryButton>
        </Container>
    )
}
