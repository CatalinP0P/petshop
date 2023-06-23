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
    const [productsLoaded, setProductsLoaded] = useState(false)

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

        const response = await db.searchProducts({
            category: category,
            q: q,
            minPrice: minPrice,
            maxPrice: maxPrice,
        })
        setProducts(response)
        setProductsLoaded(true)
    }

    useEffect(() => {
        fetchProducts()
    }, [window.location.href])

    return (
        <Container
            className={'py-6 flex flex-col md:flex-row px-2 xl:px-0 gap-4'}
        >
            <DesktopFilters
                filters={filters}
                setFilters={setFilters}
                setFilter={setFilter}
            />
            {productsLoaded ? (
                <div className="flex flex-col gap-2 w-full">
                    {products.length > 0 ? (
                        <>
                            <label className="text-4xl font-bold uppercase w-full whitespace-nowrap">
                                Products found{' '}
                                {filters.find((m) => m.key == 'q') ? (
                                    <label>
                                        {'after : ' +
                                            filters.find((m) => m.key == 'q')
                                                .value}
                                    </label>
                                ) : null}
                            </label>
                        </>
                    ) : (
                        <label className="text-4xl font-bold uppercase w-full whitespace-nowrap">
                            No products found
                        </label>
                    )}
                    <div className="w-full h-[1px] bg-gray-400" />
                    <ProductsContainer
                        className={'mt-4 h-fit'}
                        products={products}
                    />
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-4xl font-bold uppercase">
                    Loading...
                </div>
            )}
        </Container>
    )
}
