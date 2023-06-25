import React, { useEffect, useState } from 'react'
import { useDatabaseContext } from '../../context/databaseContext'
import { useAuth } from '../../context/authContext'
import easyinvoice from 'easyinvoice'
import PrimaryButton from '../../components/PrimaryButton'

export default function OrderCard({ order }) {
    const db = useDatabaseContext()
    const auth = useAuth()

    const [invoicePDF, setInvoicePDF] = useState('')

    const getInvoiceProducts = async (order) => {
        var invoiceProducts = []
        for (var i = 0; i < order.products.length; i++) {
            const prodDb = await db.getProduct(order.products[i])
            invoiceProducts.push({
                quantity: 1,
                description: prodDb.title,
                price: prodDb.price,
                'tax-rate': 0,
            })
        }

        return invoiceProducts
    }

    const createInvoice = async (orderId) => {
        const order = await db.getOrder(orderId)
        const invoiceProducts = await getInvoiceProducts(order)

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
            easyinvoice.download('invoice.pdf', result.pdf)
        })
    }

    const downloadInvoice = async () => {
        await createInvoice(order._id)
    }

    return (
        <div className="border border-gray-300 rounded-md flex flex-col gap-1 w-full p-4">
            <label># Order : {order._id}</label>
            <label>Date: {new Date(order.createdAt).toISOString()}</label>
            <PrimaryButton onClick={downloadInvoice} className={'mt-4'}>
                Download Invoice
            </PrimaryButton>
        </div>
    )
}
