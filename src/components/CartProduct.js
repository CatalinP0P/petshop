import React, { useEffect, useImperativeHandle, useState } from 'react'
import { useDatabaseContext } from '../context/databaseContext'
import Paragraph from '../components/Paragraph'
import { useNavigate } from 'react-router-dom'

export default function CartProduct({ className, product }) {
    const db = useDatabaseContext()
    const navigate = useNavigate()

    return product ? (
        <div
            className="border-b border-gray-400 flex flex-row py-2 gap-2 justify-between"
            onClick={() => {
                navigate('/product/' + product._id)
                window.location.reload()
            }}
        >
            <img
                className="w-[30%] object-contain h-[100%]"
                src={product.imageURL}
            />
            <div className="flex w-full flex-col justify-between">
                <Paragraph
                    className={'whitespace-normal leading-normal text-xs mt-0'}
                >
                    {product.title}
                </Paragraph>
                <label className="text-2xl font-bold text-primary">
                    {product.price}€
                </label>
            </div>
        </div>
    ) : (
        <label className="py-6">loading...</label>
    )
}
