import React from "react";
import Container from "../components/Container";
import FooterInfoDesktop from "./FooterInfoDesktop";
import FooterInfoMobile from "./FooterInfoMobile";

export default function Footer() {
  return (
    <>
      <div className="w-full bg-primary lg:py-6 text-md uppercase">
        <Container>
          <FooterInfoDesktop />
          <FooterInfoMobile />
        </Container>
      </div>
      <div className="w-full bg-primary-dark text-gray-300 py-4 text-xs uppercase font-bold px-2">
        <Container>© All Rights Reserved</Container>
      </div>
    </>
  );
}
