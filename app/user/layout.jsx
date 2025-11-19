"use client";
import { useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function UserLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-[#f9fafb] overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Konten utama */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Topbar */}
        <Topbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Area Konten */}
        <main className="pt-20 px-8 overflow-y-auto h-full transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}