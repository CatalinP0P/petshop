import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { useParams } from 'react-router-dom'
import { useDatabaseContext } from '../../context/databaseContext'
import Paragraph from '../../components/Paragraph'
import ProductsContainer from '../../components/ProductsContainer'
import PrimaryButton from '../../components/PrimaryButton'
import Info from '../../components/Info'
import Title from '../../components/Title'

export default function Product() {
    const { id } = useParams()
    const db = useDatabaseContext()

    const [product, setProduct] = useState()
    const [similarProducts, setSimilarProducts] = useState([])

    const fetchProduct = async () => {
        const product = await db.getProduct(id)
        setProduct(product)
        fetchSimilarProducts(product)
    }

    const fetchSimilarProducts = async (product) => {
        const products = await db.searchProducts({
            category: product.category,
            limit: 6,
        })

        let newArray = []
        products.forEach((x) => {
            if (x.title != product.title && newArray.length < 5)
                newArray.push(x)
        })

        setSimilarProducts(newArray)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return product ? (
        <>
            <Container
                className={'py-4 flex flex-col md:flex-row gap-4 px-2 lg:px-0'}
            >
                <img
                    className="w-full md:w-[40%] object-contain"
                    src={product.imageURL}
                />

                <div className="flex flex-col gap-4 w-full text-gray-800">
                    <label className="font-bold uppercase text-4xl">
                        {product.title}
                    </label>
                    <div className="w-full h-[1px] bg-gray-300 my-4" />
                    <label className="text-primary font-extrabold text-4xl mt-8">
                        {product.price}€
                    </label>

                    <div className="border border-gray-300 rounded-md p-4 mt-8 w-full flex flex-row gap-4 items-end justify-between">
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-gray-400">Quantity</label>
                            <input
                                defaultValue={1}
                                className="p-2 border border-primary rounded-md"
                                type="number"
                            />
                        </div>
                        <div className="lg:w-full" />
                        <PrimaryButton className={'w-full h-fit py-[10px]'}>
                            Add to Cart
                        </PrimaryButton>
                    </div>
                </div>
            </Container>
            <Info />
            <Container className={'mt-16 pb-32'}>
                <Title>Description</Title>
                <Paragraph>{product.description}</Paragraph>

                <Title className={'pt-16'}>Similar products</Title>
                <ProductsContainer
                    products={similarProducts}
                ></ProductsContainer>
            </Container>
        </>
    ) : <label>Loading product...</label>
}
