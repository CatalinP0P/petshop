import React, { useState } from "react";

import arrow from "../assets/arrow.svg";

export default function DropdownButton({ children, title }) {
  const [visible, setVisibility] = useState(false);
  return (
    <div className="flex flex-col w-full text-white uppercase font-bold border-b border-white">
      <div
        className="flex flex-row justify-between w-full p-4 cursor-pointer relative items-center "
        onClick={() => setVisibility(!visible)}
      >
        <label>{title}</label>
        <img
          src={arrow}
          className={
            "w-[16px] h-[16px] transition-all " + (visible ? " rotate-180" : "rotate-0")
          }
        />
      </div>
      <div
        className={
          " flex flex-col gap-2 w-full text-start  overflow-hidden transition-all text-sm px-4 " +
          (visible ? " max-h-[500px] p-4" : " max-h-[0px]")
        }
      >
        {children}
      </div>
    </div>
  );
}
