import React from "react";
import SlideShow from "./SlideShow";
import Info from "./Info";
import MobileCategories from "./MobileCategories";
import hrana from "../../assets/hrana.png";
import ProductsContainer from "../../components/ProductsContainer";
import Container from "../../components/Container";
import About from "./About";

const BestSellers = [
  {
    id: 1,
    image: hrana,
    title: "N&D GRAIN FREE ADULT MINI MIEL, AFINE SI DOVLEAC, 2.5 KG",
    category: "dogs",
    price: 29.33,
  },
  {
    id: 1,
    image: hrana,
    title: "N&D GRAIN FREE ADULT MINI MIEL, AFINE SI DOVLEAC, 2.5 KG",
    category: "dogs",
    price: 29.33,
  },
];
export default function Home() {
  return (
    <>
      <SlideShow />
      <Info />
      <MobileCategories className={"py-6"} />
      <Container className={"pt-16 px-2"}>
        <label className="text-4xl font-bold uppercase">Best Sellers</label>
        <ProductsContainer className={"pt-2"} products={BestSellers} />
      </Container>

      <Container className={"pt-16 px-2"}>
        <label className="text-4xl font-bold uppercase">Recently Visited</label>
        <ProductsContainer className={"pt-2"} products={BestSellers} />
      </Container>

      <Container className={"pt-16 pb-64 px-2"}>
        <hr className="py-6" />
        <About />
      </Container>
    </>
  );
}
