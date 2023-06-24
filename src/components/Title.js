import React from 'react'

export default function Title({ children, className }) {
    return (
        <div
            className={
                'text-3xl font-extrabold uppercase text-gray-800 ' + className
            }
        >
            {children}
        </div>
    )
}
