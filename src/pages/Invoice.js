import React, { useEffect } from 'react'
import easyinvoice from 'easyinvoice'
import PrimaryButton from '../components/PrimaryButton'

export default function Invoice({ invoicePDF }) {
    useEffect(() => {
        easyinvoice.render('pdf', invoicePDF)
    })

    const downloadInvoice = () => {
        easyinvoice.download('invoice.pdf', invoicePDF)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div
                id="pdf"
                className="w-full h-[100vw]"
            ></div>
            <PrimaryButton onClick={() => downloadInvoice()}>
                Download Invoice
            </PrimaryButton>
        </div>
    )
}
