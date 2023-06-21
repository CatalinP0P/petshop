import React from "react";

import truckFast from "../../assets/truck-fast.svg";
import truck from "../../assets/truck-field.svg";
import phone from "../../assets/phone-volume.svg";
import arrowsRotate from "../../assets/arrows-rotate.svg";

export default function Info() {
  return (
    <div className="w-full bg-gray-100 py-8 hidden lg:block">
      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-4 gap-8">
        <div className="flex flex-row gap-4">
          <img className="w-[56px] h-[56px]" src={truckFast} />
          <div className="flex flex-col justify-between">
            <label className="uppercase text-blue-600 text-lg font-extrabold">
              Fast Delivery
            </label>
            <label className="text-gray-400">In all Romania</label>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <img className="w-[56px] h-[56px]" src={truck} />
          <div className="flex flex-col justify-between">
            <label className="uppercase text-blue-600 text-lg font-extrabold">
              Free Delivery
            </label>
            <label className="text-gray-400">On orders over 50€</label>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <img className="w-[56px] h-[56px]" src={arrowsRotate} />
          <div className="flex flex-col justify-between">
            <label className="uppercase text-blue-600 text-lg font-extrabold">
              Refund
            </label>
            <label className="text-gray-400">Refund in max 14 days</label>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <img className="w-[56px] h-[56px]" src={arrowsRotate} />
          <div className="flex flex-col justify-between">
            <label className="uppercase text-blue-600 text-lg font-extrabold whitespace-nowrap">
              Customer Support
            </label>
            <label className="text-gray-400">Call (1234) 568 890</label>
          </div>
        </div>
      </div>
    </div>
  );
}
