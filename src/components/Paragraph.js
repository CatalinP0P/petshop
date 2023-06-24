import React from 'react'

export default function Paragraph({ children, className }) {
    return (
        <p className={'mt-4 font-light leading-8 ' + className}>{children}</p>
    )
}
