import React, { useState } from 'react'
import dogs from '../../assets/dogs.jpeg'
import Title from '../../components/Title'
import Paragraph from '../../components/Paragraph'

export default function About() {
    const [viewMore, setViewMore] = useState(false)

    const view = () => {
        setViewMore(true)
    }

    return (
        <div>
            <div className="overflow-hidden relative">
                <img className="w-[500px] h-full float-right" src={dogs} />

                <Title>
                    Minim reprehenderit occaecat enim excepteur mollit ex.
                </Title>
                <Paragraph>
                    Mollit laboris quis qui ullamco ut ad cupidatat irure
                    veniam. Sunt magna ipsum velit ea. Cillum sunt exercitation
                    eiusmod fugiat veniam cillum magna elit. Elit reprehenderit
                    elit in cillum incididunt enim sint incididunt dolore.
                    Ullamco ex amet exercitation excepteur dolor. Non ad
                    cupidatat et cillum voluptate. Reprehenderit qui ex
                    exercitation cupidatat amet est. Amet elit amet cillum
                    proident magna amet nostrud. Culpa laborum eiusmod dolor
                    exercitation duis. Voluptate dolor eiusmod pariatur culpa
                    commodo sunt nisi cillum nulla nostrud labore amet tempor.
                    Velit dolore anim deserunt cillum adipisicing irure commodo
                    sit culpa exercitation mollit laborum id. Do velit aute in
                    aute nisi ea duis ex commodo. Do incididunt sunt sint quis
                    est esse sit aute consectetur in id. Eu irure mollit velit
                    consectetur exercitation dolor tempor laboris sint cupidatat
                    pariatur non enim anim. Et laboris eu id labore do commodo
                    consequat velit laboris exercitation est dolore eiusmod. Qui
                    irure excepteur anim enim sint non et excepteur non
                    cupidatat consectetur id nulla. Veniam pariatur adipisicing
                    ipsum amet nulla ut. Et minim sunt culpa voluptate deserunt
                    amet aute. Esse eu reprehenderit incididunt esse qui aliquip
                    ex amet proident voluptate labore. Irure mollit sit enim
                    labore. Tempor irure commodo ipsum ipsum eu. Fugiat ad
                    labore ullamco duis sint. Cillum consequat ex deserunt
                    labore ut. Culpa amet id magna officia incididunt duis
                    excepteur id eu nostrud fugiat ut commodo. Commodo consequat
                    veniam laboris veniam in ut. Sit sint magna ipsum labore
                    non. Qui deserunt aute culpa voluptate irure consequat minim
                    qui. Non sit esse nisi pariatur ad laborum voluptate.
                    Officia Lorem ea ad eiusmod.
                </Paragraph>
            </div>
        </div>
    )
}
