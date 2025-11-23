"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function HomePage() {
  const [buku, setBuku] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Ambil data buku (WAJIB no-store & revalidate: 0)
  const fetchBuku = async () => {
    try {
      const res = await fetch("/api/buku", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      const data = await res.json();
      setBuku(data);
    } catch (error) {
      console.error("Gagal fetch buku:", error);
    }
  };

  useEffect(() => {
    fetchBuku();
  }, []);

  // Wishlist
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const saveWishlist = (data) => {
    setWishlist(data);
    localStorage.setItem("wishlist", JSON.stringify(data));
  };

  const addToWishlist = (item) => {
    const already = wishlist.find((x) => x.id_buku === item.id_buku);
    if (already) return;

    const newList = [...wishlist, item];
    saveWishlist(newList);

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
                {item.gambar?.startsWith("http") ? (
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="object-contain h-full p-2"
                    onError={(e) => (e.target.src = "/no-image.jpg")}
                  />
                ) : (
                  <Image
                    src={item.gambar ? `/buku/${item.gambar}` : "/no-image.jpg"}
                    alt={item.judul}
                    width={150}
                    height={200}
                    className="object-contain h-full p-2"
                    onError={(e) => (e.target.src = "/no-image.jpg")}
                  />
                )}
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
