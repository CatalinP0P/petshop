import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { useFetcher, useNavigate, useSearchParams } from 'react-router-dom'
import DesktopFilters from './DesktopFilters'
import { useDatabaseContext } from '../../context/databaseContext'
import ProductsContainer from '../../components/ProductsContainer'

export default function Search() {
    const [products, setProducts] = useState([])

    const db = useDatabaseContext()

    const [searchParams] = useSearchParams()
    const [filters, setFilters] = useState([])
    const [loadedFilters, setLoadedFilters] = useState(false)

    const navigate = useNavigate()

    const getFilterParams = () => {
        searchParams.forEach((value, key) => {
            setFilters((old) => [...old, { key: key, value: value }])
        })
        setLoadedFilters(true)
        console.log('Loaded')
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

    const deconstructFilters = () => {
        const q = filters.find((m) => m.key == 'q')
            ? filters.find((m) => m.key == 'q').value
            : null

        const category = filters.find((m) => m.key == 'category')
            ? filters.find((m) => m.key == 'category').value
            : null

        const minPrice = filters.find((m) => m.key == 'minPrice')
            ? filters.find((m) => m.key == 'minPrice').value
            : null

        const maxPrice = filters.find((m) => m.key == 'maxPrice')
            ? filters.find((m) => m.key == 'maxPrice').value
            : null

        return { q, category, minPrice, maxPrice }
    }

    const fetchProducts = async () => {
        if (!loadedFilters) return

        const { q, category, minPrice, maxPrice } = deconstructFilters()

        console.log(q, category)

        const response = await db.searchProducts({ category: category, q: q, minPrice: minPrice, maxPrice: maxPrice })
        setProducts(response)
    }

    useEffect(() => {
        fetchProducts()
    }, [window.location.href])

    return (
        <Container className={'py-6 flex flex-row px-2 xl:px-0 gap-4'}>
            <DesktopFilters
                filters={filters}
                setFilters={setFilters}
                setFilter={setFilter}
            />
            <ProductsContainer className={'h-fit'} products={products} />
        </Container>
    )
}
