"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  // Hapus dari wishlist
  const removeItem = (id) => {
    const newList = wishlist.filter((item) => item.id_buku !== id);
    setWishlist(newList);
    localStorage.setItem("wishlist", JSON.stringify(newList));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 text-gray-800">
      <h2 className="text-2xl font-semibold text-[#0a4e75] mb-6">
        Wishlist Saya
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-700">Wishlist masih kosong.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {wishlist.map((item) => (
            <div
              key={item.id_buku}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4"
            >

              {/* Gambar Buku */}
              <div className="flex justify-center items-center bg-gray-100 rounded-xl h-56">
                <Image
                  src={`/buku/${item.gambar}`}
                  width={150}
                  height={200}
                  alt={item.judul}
                  className="object-contain h-full p-2"
                />
              </div>

              <p className="text-gray-500 text-sm mt-3">
                Kategori: {item.kategori}
              </p>

              <h3 className="mt-2 text-lg font-semibold">{item.judul}</h3>

              {/* Button Detail + Trash */}
              <div className="mt-4 flex items-center gap-3">

                {/* Detail */}
                <Link href={`/user/detail/${item.id_buku}`} className="flex-1">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium">
                    Detail
                  </button>
                </Link>

                {/* Icon Trash */}
                <button
                  onClick={() => removeItem(item.id_buku)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  <Trash2 size={20} />
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
