import React from "react";

import Logo from "../components/Logo";
import Cart from "../assets/cart.svg";
import User from "../assets/user.svg";

const categories = ["dogs", "cats", "fishes", "birds", "rodent"];

export default function Header() {
  return (
    <>
      <div className="hidden md:block w-full bg-gray-100 p-4">
        <div className="max-w-[1100px] mx-auto flex flex-row gap-4 justify-between items-center uppercase font-extrabold text-sm">
          <div className="text-orange-600 flex flex-row gap-8">
            <label className="cursor-pointer">about</label>
            <label className="cursor-pointer">contact</label>
            <a href="tel: (1234) 567 890">
              <span className="text-gray-400">phone: </span>(1234) 567 890
            </a>
          </div>
          <div />
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto flex flex-row items-center gap-8 justify-between py-4 flex-wrap md:flex-nowrap">
        <Logo className={"mt-[-10px] order-1"} />
        <input
          placeholder="Search for a product"
          className="px-4 py-2 rounded-md border-2 border-orange-600 w-full order-10 md:order-2"
        />
        <div className="flex flex-row order-3 gap-8 md:gap-16">
          <div className="flex flex-row gap-4 order-3">
            <img
              src={User}
              className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
            />
            <div className="hidden md:flex flex-col justify-between">
              <label className="text-gray-400">Welcome</label>
              <label className="whitespace-nowrap uppercase font-extrabold text-orange-600">
                My account
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-4 md:me-16 xl:me-0 order-4">
            <img src={Cart} className="h-[24px] md:w-[40px] md:h-[40px]" />
            <div className="hidden md:flex flex-col justify-between">
              <label className="text-gray-400 whitespace-nowrap">
                1 Product
              </label>
              <label className="whitespace-nowrap uppercase font-extrabold text-orange-600">
                Cart
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary py-4 md:flex hidden uppercase text-gray-50">
        <div className="max-w-[1100px] font-extrabold flex flex-row gap-8 mx-auto w-full">
          {categories.map((cat) => {
            return <a key={cat}>{cat}</a>;
          })}
          <a className="text-orange-600">offers</a>
        </div>
      </div>
    </>
  );
}
