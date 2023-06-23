import React, { useEffect, useState, useRef } from 'react'

var categories = [
    { text: 'Dog' },
    { text: 'Cat' },
    { text: 'Bird' },
    { text: 'Fish' },
    { text: 'Rodent' },
    { text: 'Tarantula' },
]

const priceIntervals = [
    {
        minPrice: 0,
        maxPrice: 50,
    },
    {
        minPrice: 50,
        maxPrice: 100,
    },
    {
        minPrice: 100,
        maxPrice: 250,
    },
    {
        minPrice: 250,
        maxPrice: 500,
    },
    {
        minPrice: 500,
        maxPrice: 750,
    },
    {
        minPrice: 750,
        maxPrice: 1000,
    },
]

export default function DesktopFilters({ filters, setFilters, setFilter }) {
    const minPriceRef = useRef(null)
    const maxPriceRef = useRef(null)

    const [category, setCategory] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    useEffect(() => {
        getFiltersStates()
    }, [window.location.href])

    const getFiltersStates = async () => {
        const categoryFilter = filters.filter((m) => m.key == 'category')[0]
        setCategory(categoryFilter ? categoryFilter.value : null)

        const minPrice = filters.filter((m) => m.key == 'minPrice')[0]
        setMinPrice(minPrice ? minPrice.value : null)

        const maxPrice = filters.filter((m) => m.key == 'maxPrice')[0]
        setMaxPrice(maxPrice ? maxPrice.value : null)
    }

    const handlePriceButton = async () => {
        const minPrice = minPriceRef.current.value
        const maxPrice = maxPriceRef.current.value

        if (minPrice) setFilter('minPrice', minPrice)
        if (maxPrice) setFilter('maxPrice', maxPrice)
    }

    const handlePriceInput = async (e) => {
        const minPrice = e.target.dataset.minprice
        const maxPrice = e.target.dataset.maxprice
        console.log(minPrice + ' ' + maxPrice)

        setFilter('minPrice', minPrice)
        setFilter('maxPrice', maxPrice)
    }

    const handleInputChanged = async (e) => {
        const filterValue = e.target.dataset.value
        const filter = e.target.dataset.filter

        setFilter(filter, filterValue)
    }

    return (
        <div className="w-fit flex flex-row md:flex-col gap-4 justify-start items-start h-fit">
            <div className="flex flex-col gap-2 text-gray-800 h-full">
                <label className="text-xl uppercase font-bold">
                    Categories
                </label>
                {categories.map((cat) => {
                    return (
                        <div
                            key={Math.random() * 1000}
                            className="flex flex-row gap-1 items-center"
                        >
                            <input
                                onChange={handleInputChanged}
                                type="checkbox"
                                checked={
                                    category
                                        ? category.toLowerCase() ==
                                          cat.text.toLowerCase()
                                            ? true
                                            : false
                                        : false
                                }
                                data-value={cat.text}
                                data-filter="category"
                            />
                            <label>{cat.text}</label>
                        </div>
                    )
                })}
            </div>

            <hr className="my-2" />
            <div className="flex flex-col gap-2 text-gray-800 h-full">
                <label className="text-xl uppercase font-bold">Price</label>
                {priceIntervals.map((price) => {
                    return (
                        <div
                            key={price.minPrice + ' ' + price.maxPrice}
                            className="flex flex-row gap-1 items-center"
                        >
                            <input
                                onChange={handlePriceInput}
                                data-minprice={price.minPrice}
                                data-maxprice={price.maxPrice}
                                type="checkbox"
                                checked={
                                    minPrice == price.minPrice &&
                                    maxPrice == price.maxPrice
                                        ? true
                                        : false
                                }
                            />
                            <label>{`${price.minPrice} - ${price.maxPrice}`}</label>
                        </div>
                    )
                })}
                <div className="flex flex-row gap-2">
                    <input
                        type="number"
                        ref={minPriceRef}
                        className="border borer-gray-400 w-[64px] px-1"
                    />
                    <input
                        type="number"
                        ref={maxPriceRef}
                        className="border borer-gray-400 w-[64px] px-1"
                    />
                </div>
                <button
                    className="bg-orange-600 rounded-md text-white py-1 px-2"
                    onClick={handlePriceButton}
                >
                    Set
                </button>
            </div>
        </div>
    )
}
