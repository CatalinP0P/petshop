import React from 'react'

export default function PrimaryButton({ className, onClick, children }) {
    return (
        <div
            onClick={onClick}
            className={
                'w-fit px-6 py-2 bg-orange-600 rounded-md shadow-md font-bold text-white hover:text-gray-300 flex flex-row justify-between items-center cursor-pointer ' +
                className
            }
        >
            {children}
        </div>
    )
}
