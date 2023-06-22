import React from 'react'

import cat from '../../assets/cat.svg'
import dog from '../../assets/dog.svg'
import fish from '../../assets/fish-fins.svg'
import bird from '../../assets/kiwi-bird.svg'
import rat from '../../assets/rat.svg'
import CategoryCard from './CategoryCard'
import spider from '../../assets/spider.svg'

var categories = [
    { text: 'dogs', image: dog },
    { text: 'cats', image: cat },
    { text: 'birds', image: bird },
    { text: 'fishes', image: fish },
    { text: 'rodents', image: rat },
    { text: 'tarantulas', image: spider },
]

export default function MobileCategories({ className }) {
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
                        <CategoryCard text={cat.text} image={cat.image} />
                    </div>
                )
            })}
        </div>
    )
}
