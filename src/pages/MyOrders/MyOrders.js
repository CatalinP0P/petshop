import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { useDatabaseContext } from '../../context/databaseContext'
import OrderCard from './OrderCard'
import { useAuth } from '../../context/authContext'
import easyinvoice from 'easyinvoice'

export default function MyOrders() {
    const db = useDatabaseContext()
    const auth = useAuth()

    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const token = await auth.currentUser.getIdToken()
        db.setIdToken(token)

        const orders = await db.getMyOrders()
        setOrders(orders)
    }

    useEffect(() => {
        try {
            if (!auth.currentUser) {
                window.location.href = window.origin
                window.reload()
            }
            fetchOrders()
        } catch (err) {}
    }, [])

    return (
        <Container className={'px-1 md:px-0 flex flex-col gap-2 py-8'}>
            {orders.map((order) => {
                return (
                    <div key={Math.random() * 1000}>
                        <OrderCard order={order} />
                    </div>
                )
            })}
        </Container>
    )
}
