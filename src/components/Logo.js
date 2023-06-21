import React from "react";

export default function Logo({ className }) {
  return (
    <label
      className={
        "font-extrabold text-4xl md:text-6xl text-blue-500 " + className
      }
    >
      Pet
      <span className="text-orange-600">Shop</span>
    </label>
  );
}
