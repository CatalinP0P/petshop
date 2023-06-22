import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo({ className }) {
    return (
        <Link
        to={"/"}
            className={
                'font-extrabold text-4xl md:text-6xl text-primary ' + className
            }
        >
            Pet
            <span className="text-orange-600">Shop</span>
        </Link>
    )
}
