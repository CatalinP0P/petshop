import React, { useEffect } from 'react'
import Container from '../../components/Container'
import { useSearchParams } from 'react-router-dom'

export default function Search() {
    const [searchParams] = useSearchParams()
    const getFilterParams = () => {
        const q = searchParams.get('q')
        searchParams.forEach((value, key) => {
            console.log(key, value)
        })
    }

    useEffect(() => {
        getFilterParams()
    }, [])

    return <Container className={'py-6 flex flex-col'}></Container>
}
