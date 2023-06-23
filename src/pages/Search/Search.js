import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DesktopFilters from './DesktopFilters'

export default function Search() {
    const [searchParams] = useSearchParams()
    const [filters, setFilters] = useState([])

    const navigate = useNavigate()

    const getFilterParams = () => {
        searchParams.forEach((value, key) => {
            setFilters((old) => [...old, { key: key, value: value }])
        })
    }

    const setFilter = (key, value) => {
        const filtered = filters.filter((m) => m.key == key)

        // if the filter is already applied, we change it
        var newFilters = filters
        if (filtered.length > 0) {
            for (var i = 0; i < filters.length; i++) {
                if (newFilters[i].key == key) {
                    if (newFilters[i].value != value)
                        newFilters[i].value = value
                    else {
                        newFilters.splice(i, 1)
                    }
                }
            }
        } else {
            var item = { key: key, value: value }
            newFilters.push(item)
            console.log(item)
        }

        setFilters([...newFilters])
    }

    useEffect(() => {
        getFilterParams()
    }, [])

    useEffect(() => {
        var searchParamsString = '/search?'
        filters.forEach((filter) => {
            searchParamsString += `&${filter.key}=${filter.value}`
        })
        navigate(searchParamsString)
    }, [filters])
    return (
        <Container className={'py-6 flex flex-col'}>
            <DesktopFilters
                filters={filters}
                setFilters={setFilters}
                setFilter={setFilter}
            />
            {filters.map((filter) => {
                return (
                    <div
                        className="flex flex-row gap-4 justify-around w-full"
                        key={Math.random() * 1000}
                    >
                        <label>Key: {filter.key}</label>
                        <label>Value: {filter.value}</label>
                    </div>
                )
            })}
        </Container>
    )
}
