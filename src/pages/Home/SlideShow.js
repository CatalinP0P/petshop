import React from "react";
import HeroSlider, { Slide } from "hero-slider";

import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.jpg";
import image5 from "../../assets/5.jpg";

const slides = [image1, image2, image3, image4, image5];

export default function SlideShow() {
  return (
    <HeroSlider
      height={"25vw"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
      }}
    >
      {slides.map((x) => {
        return (
          <Slide
            background={{
              backgroundImageSrc: x,
            }}
          />
        );
      })}
    </HeroSlider>
  );
}
