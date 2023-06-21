import React from "react";
import SlideShow from "./SlideShow";
import Info from "./Info";
import MobileCategories from "./MobileCategories";

export default function Home() {
  return (
    <>
      <SlideShow />
      <Info />
      <MobileCategories className={"pt-4"} />
    </>
  );
}
