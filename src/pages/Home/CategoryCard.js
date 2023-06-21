import React from "react";

export default function CategoryCard({ image, text, onClick }) {
  return (
    <div
      className="flex flex-col gap-2 items-center cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-[96px] h-[96px] bg-orange-500 rounded-md p-4"
        src={image}
        alt="no image found"
      />
      <label className="text-blue-600 uppercase font-bold">{text}</label>
    </div>
  );
}
