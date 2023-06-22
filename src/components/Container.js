import React, { Children } from "react";

export default function Container({ className, children }) {
  return (
    <div className={"w-full max-w-[1100px] mx-auto" + " " + className}>
      {children}
    </div>
  );
}
