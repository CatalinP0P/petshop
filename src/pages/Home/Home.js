import React, { useEffect, useState } from 'react'
import SlideShow from './SlideShow'
import Info from '../../components/Info'
import MobileCategories from './MobileCategories'
import { useAuth } from '../../context/authContext'
import hrana from '../../assets/hrana.png'
import ProductsContainer from '../../components/ProductsContainer'
import Container from '../../components/Container'
import About from './About'
import { useDatabaseContext } from '../../context/databaseContext'
import firebase from '../../lib/firebase.js'
import Title from '../../components/Title'
import { useCart } from '../../context/cartContext'
import { json, useSearchParams } from 'react-router-dom'

export default function Home() {
    const auth = useAuth()
    const db = useDatabaseContext()
    const cartContext = useCart()

    const [RecentlyVisited, setRecentlyVisited] = useState([])

    const fetchRecenltyVisited = async () => {
        setRecentlyVisited([])
        var ids = localStorage.getItem('recentlyVisited')
        ids = JSON.parse(ids)

        var array = []
        for (var i = 0; i < ids.length; i++) {
            const product = await db.getProduct(ids[i])
            array.push(product)
        }
        setRecentlyVisited(array)
    }

    useEffect(() => {
        db.fetchProducts()
        fetchRecenltyVisited()
    }, [])

    return (
        <>
            <SlideShow />
            <Info />
            <MobileCategories className={'py-6'} />
            <Container className={'pt-16 px-2'}>
                <Title>Best Sellers</Title>
                <ProductsContainer
                    className={'pt-2'}
                    products={db.bestSellers}
                />
            </Container>

            <Container className={'pt-16 px-2'}>
                <Title>Recently Visited</Title>
                <ProductsContainer
                    className={'pt-2'}
                    products={RecentlyVisited}
                />
            </Container>

            <Container className={'pt-16 pb-64 px-2'}>
                <hr className="py-6" />
                <About />
            </Container>
        </>
    )
}
