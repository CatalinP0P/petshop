import React from 'react'

import cat from '../../assets/cat.svg'
import dog from '../../assets/dog.svg'
import fish from '../../assets/fish-fins.svg'
import bird from '../../assets/kiwi-bird.svg'
import rat from '../../assets/rat.svg'
import CategoryCard from './CategoryCard'
import spider from '../../assets/spider.svg'
import { useNavigate } from 'react-router-dom'

var categories = [
    { text: 'dog', image: dog },
    { text: 'cat', image: cat },
    { text: 'bird', image: bird },
    { text: 'fish', image: fish },
    { text: 'rodent', image: rat },
    { text: 'tarantula', image: spider },
]

export default function MobileCategories({ className }) {
    const navigate = useNavigate()

    return (
        <div
            className={
                'md:hidden bg-gray-50 grid grid-cols-3 gap-4 gap-y-6' +
                ' ' +
                className
            }
        >
            {categories.map((cat) => {
                return (
                    <div key={cat._id || Math.random() * 1000}>
                        <CategoryCard
                            text={cat.text}
                            image={cat.image}
                            onClick={() => {
                                navigate('/search?category=' + cat.text)
                                window.location.reload()
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}
