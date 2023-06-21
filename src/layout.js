import React from "react";

import Header from "./components/Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="px-2 md:px-0">
        <Header />
      </header>
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
