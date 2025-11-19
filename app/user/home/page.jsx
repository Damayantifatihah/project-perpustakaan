"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function HomePage() {
  const [buku, setBuku] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load data buku
  useEffect(() => {
    fetch("/api/buku")
      .then((res) => res.json())
      .then((data) => setBuku(data));
  }, []);

  // Load wishlist dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  // Simpan wishlist ke localStorage
  const saveWishlist = (data) => {
    setWishlist(data);
    localStorage.setItem("wishlist", JSON.stringify(data));
  };

  // Tambah ke wishlist
  const addToWishlist = (item) => {
    const already = wishlist.find((x) => x.id_buku === item.id_buku);

    if (already) return; // Biar tidak double

    const newList = [...wishlist, item];
    saveWishlist(newList);

    // Arahkan ke halaman wishlist
    window.location.href = "/user/wishlist";
  };

  return (
    <div className="flex min-h-screen bg-green-50 text-gray-800">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-[#0a4e75] mb-6">
          Daftar Buku
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {buku.map((item) => (
            <div
              key={item.id_buku}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4"
            >
              <div className="flex justify-center items-center rounded-xl bg-gray-100 h-56">
                <Image
                  src={`/buku/${item.gambar}`}
                  alt={item.judul}
                  width={150}
                  height={200}
                  className="object-contain h-full p-2"
                />
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Kategori: {item.kategori}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <Link href={`/user/detail/${item.id_buku}`} className="flex-1">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium">
                    Detail
                  </button>
                </Link>

                {/* Tombol Love */}
                <button
                  onClick={() => addToWishlist(item)}
                  className="p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
