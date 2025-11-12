"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Home,
  BookOpen,
  ShoppingBag,
  RefreshCcw,
  LogOut,
} from "lucide-react";

export default function HomePage() {
  const [active, setActive] = useState("Beranda");

  const navItems = [
    { name: "Beranda", icon: <Home size={20} color="#FDB813" />, href: "#" },
    { name: "Kategori", icon: <BookOpen size={20} color="#FDB813" />, href: "#" },
    { name: "Peminjaman", icon: <ShoppingBag size={20} color="#FDB813" />, href: "#" },
    { name: "Pengembalian", icon: <RefreshCcw size={20} color="#FDB813" />, href: "#" },
  ];

  return (
    <div className="flex h-screen bg-[#EAF2FF] font-sans">
      {/* ===== Sidebar ===== */}
      <aside className="w-64 bg-[#ffffff] text-[#083A6F] flex flex-col items-center py-8 border-r border-[#C5D8F1]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-15 px-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />
          <div className="flex flex-col leading-tight">
            <h1 className="text-lg font-semibold text-[#083A6F]">Starbhak</h1>
            <h1 className="text-lg font-semibold text-[#083A6F]">Library</h1>
          </div>
        </div>


        {/* Profile */}
        <div className="flex items-center gap-5 mb-10 px-4">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={55}
            height={55}
            className="rounded-full border border-[#C5D8F1]"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-[#083A6F] text-sm">
              Taylor Swift XI RPL 5
            </p>
            <div className="flex items-center gap-1 text-xs mt-1">
              <span className="text-green-500 text-lg">●</span>
              <span className="text-[#083A6F] font-medium">SISWA</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col w-full space-y-3 px-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all text-sm font-medium
                ${
                  active === item.name
                    ? "bg-[#083A6F] text-white"
                    : "hover:bg-[#CFE0FA]"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto w-full px-6">
          <button className="flex items-center space-x-3 px-4 py-2 w-full rounded-lg text-[#083A6F] hover:bg-[#CFE0FA] transition-all text-sm">
            <LogOut size={18} color="#083A6F" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-[#083A6F]">Daftar Buku</h2>

        {/* Grid Buku */}
        <div className="grid grid-cols-3 gap-8">
          {/* Buku Card */}
          <div className="bg-white border border-[#C5D8F1] rounded-xl shadow-sm p-3 flex flex-col items-center w-[180px]">
            <Image
              src="/book.jpg"
              alt="Buku"
              width={120}
              height={160}
              className="rounded-md mb-3"
            />
            <p className="font-semibold text-center text-[#083A6F] text-sm">
              HANS
            </p>
            <span className="text-xs text-[#083A6F] mb-3">
              Kategori : Fiksi
            </span>
            <button className="bg-[#00B16A] text-white px-4 py-1 rounded-md hover:bg-[#009E5F] text-sm">
              Detail
            </button>
          </div>

          {/* Placeholder Buku */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-[#D9DFED] rounded-xl shadow-sm w-[180px] h-[250px]"
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
}
