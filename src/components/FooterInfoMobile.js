import React from "react";
import DropdownButton from "./DropdownButton";

export default function FooterInfoMobile() {
  return (
    <div className="flex flex-col md:hidden pb-16">
      <DropdownButton title={"petshops.com"}></DropdownButton>

      <DropdownButton title="Order And Delivery">
        <label>How to order</label>
        <label>How we pay</label>
        <label>How it delivers</label>
        <label>Refund Policy</label>
      </DropdownButton>

      <DropdownButton title={"Our Products"}>
        <label>For Dogs</label>
        <label>For Cats</label>
        <label>For Fish</label>
        <label>For Birds</label>
        <label>For Rodents</label>
        <label>For Tarantules</label>
      </DropdownButton>

      <label className="uppercase p-4 text-white font-bold">NEWSLETTER</label>
      <div className="flex flex-row text-xs gap-4 px-4">
        <input
          className="border border-white w-full px-3 py-2 rounded-md bg-transparent text-white"
          placeholder="Your email"
        />
        <button className="text-white bg-orange-500 px-3 py-2 uppercase font-bold rounded-md w-full">
          Subscribe
        </button>
      </div>
    </div>
  );
}
