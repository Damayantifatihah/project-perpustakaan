"use client";
import { Home, Layers, Heart, BookmarkCheck, RotateCcw, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // 🔹 DITAMBAH

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  const router = useRouter(); // 🔹 DITAMBAH

  const menus = [
    { name: "Beranda", icon: <Home size={26} />, path: "/user/home" },
    { name: "Kategori", icon: <Layers size={26} />, path: "/user/kategori" },


    { name: "Wishlist", icon: <Heart size={26} />, path: "/user/wishlist" },

    { name: "Peminjaman", icon: <BookmarkCheck size={26} />, path: "/user/daftarpinjam" },
    { name: "Pengembalian", icon: <RotateCcw size={26} />, path: "/Layout/User/Pengembalian" },
  ];

  // 🔹 Logout redirect
  const handleLogout = () => {
    router.push("/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ${
        isOpen ? "w-72" : "w-24"
      }`}
    >
      {/* Logo — bisa diklik */}
      <div
        className="flex items-center gap-5 px-7 py-8 border-b border-gray-100 cursor-pointer"
        onClick={toggleSidebar}
      >
        <Image src="/logo.png" alt="Logo Starbhak Library" width={55} height={55} />
        {isOpen && (
          <div>
            <h1 className="text-xl font-semibold text-[#0a4e75] leading-tight">LitSpace</h1>
          </div>
        )}
      </div>

      {/* User Info */}
      {isOpen && (
        <div className="flex items-center gap-5 px-7 py-6 border-b border-gray-100">
          <Image
            src="/Taylor.jpg"
            alt="User"
            width={55}
            height={70}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-lg text-[#0a4e75]">Taylor Swift 
              <br />XI RPL 5
            </p>
            <p className="text-green-600 text-1g font-bold"> ● SISWA</p>
          </div>
        </div>
      )}

      {/* Menu Navigasi */}
      <nav className="flex-1 mt-7">
        {menus.map((menu, index) => {
          const isActive = pathname === menu.path;
          return (
            <Link
              key={index}
              href={menu.path}
              className={`flex items-center rounded-lg mx-4 py-4 mb-3 text-[17px] font-medium transition-all ${
                isActive
                  ? "bg-[#E8F7F0] text-[#0a4e75] shadow-sm"
                  : "text-[#0a4e75] hover:bg-[#F3FAF7]"
              } ${isOpen ? "justify-start gap-5 px-6" : "justify-center px-0"}`}
              onClick={() => isOpen && toggleSidebar()}
            >
              <span className="flex justify-center w-12">{menu.icon}</span>
              {isOpen && <span>{menu.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto px-7 py-8 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-[#0a4e75] text-[17px] font-medium hover:text-red-600 transition"
        >
          <LogOut size={24} />
          {isOpen && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
