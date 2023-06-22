import React, { useState } from 'react'
import Container from '../../components/Container'
import { useDatabaseContext } from '../../context/databaseContext'
import PrimaryButton from '../../components/PrimaryButton'

export default function NewProduct() {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState()
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(10)
    const [category, setCategory] = useState('')

    const db = useDatabaseContext()

    const addProduct = async () => {
        console.log('Adding ')
        const res = await db.postProduct({
            title: title,
            imageURL: image,
            description: description,
            price: price,
            category: category,
        })

        console.log(res)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()

        fileReader.onload = () => {
            setImage(fileReader.result)
            console.log(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    }

    return (
        <Container className={'py-24 flex flex-col gap-6 w-full'}>
            <div className="flex flex-col gap-1">
                <label>Title</label>
                <input
                    className={inputStyle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label>Image</label>
                <img className="w-[50%] object-contain" src={image} />
                <input
                    type="file"
                    accept="image"
                    onChange={handleImageChange}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={inputStyle + ' h-[250px]'}
                ></textarea>
            </div>

            <div className="flex flex-col gap-1">
                <label>Price</label>
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label>Category</label>
                <input
                    className={inputStyle}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <PrimaryButton onClick={addProduct}>Add New Product</PrimaryButton>
        </Container>
    )
}

const inputStyle = 'p-4 border border-gray-400 rounded-md'
