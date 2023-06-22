import React from "react";

export default function FooterInfoDesktop() {
  return (
    <div className="py-8 hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6 uppercase text-gray-100 text-md px-4 xl:px-0">
      <div className="flex flex-col gap-4 h-full w-full justify-start">
        <label className="font-bold">petshops.com</label>
        <hr />
      </div>
      <div className="flex flex-col gap-4 h-full w-full">
        <label className="font-bold">Order And Delivery</label>
        <hr />
        <div className="flex flex-col gap-1 text-xs font-extrabold">
          <label>How to order</label>
          <label>How we pay</label>
          <label>How it delivers</label>
          <label>Refund Policy</label>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-full w-full">
        <label className="font-bold">Our Products</label>
        <hr />
        <div className="flex flex-col gap-1 text-xs font-extrabold">
          <label>For Dogs</label>
          <label>For Cats</label>
          <label>For Fish</label>
          <label>For Birds</label>
          <label>For Rodents</label>
          <label>For Tarantules</label>
        </div>
      </div>
      <div className="flex flex-col h-full gap-4 col-span-3 lg:col-span-2">
        <label className="font-bold">NEWSLETTER</label>
        <div className="flex flex-row text-xs gap-4">
          <input
            className="border border-white w-full px-3 py-2 rounded-md bg-transparent text-white"
            placeholder="Your email"
          />
          <button className="text-white bg-orange-500 px-3 py-2 uppercase font-bold rounded-md w-full">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
