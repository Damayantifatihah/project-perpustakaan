"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, Heart } from "lucide-react";

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

  const categoryStyles = {
    novel: { bg: "#FBEAF0", text: "#993556" },
    pendidikan: { bg: "#E6F1FB", text: "#185FA5" },
    "non fiksi": { bg: "#EAF3DE", text: "#3B6D11" },
    komik: { bg: "#FAEEDA", text: "#854F0B" },
    sains: { bg: "#E1F5EE", text: "#0F6E56" },
    default: { bg: "#EEEDFE", text: "#534AB7" },
  };

  const getCategoryColor = (cat) =>
    categoryStyles[(cat || "").toLowerCase()] || categoryStyles.default;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="fade-up flex flex-col gap-1">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0A3D6E]/8 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#0A3D6E]">
            <Heart size={13} />
            Daftar simpan
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0A3D6E]">
            Wishlist Saya
          </h2>
          <p className="text-sm text-[#5C6B7A]">
            Buku-buku yang sudah kamu tandai untuk dipinjam nanti.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="fade-up mt-12 flex flex-col items-center py-12 text-center" style={{ animationDelay: "0.06s" }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A3D6E]/8">
              <Heart size={28} className="text-[#0A3D6E]" />
            </div>
            <p className="mt-4 font-medium text-[#0A3D6E]">Wishlist masih kosong.</p>
            <p className="mt-1 text-sm text-[#5C6B7A]">
              Tandai buku favoritmu dari halaman daftar buku.
            </p>
            <Link href="/user/home">
              <button className="mt-5 rounded-lg bg-[#0A3D6E] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E4D8A]">
                Jelajahi buku
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item, i) => {
              const color = getCategoryColor(item.kategori);
              return (
                <div
                  key={item.id_buku}
                  className="fade-up group rounded-2xl border border-[#ECE7DA] bg-white p-4 shadow-[0_8px_24px_-12px_rgba(10,61,110,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-14px_rgba(10,61,110,0.28)]"
                  style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                >
                  <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-xl bg-[#F8F6EF]">
                    <Image
                      src={`/buku/${item.gambar}`}
                      width={150}
                      height={200}
                      alt={item.judul}
                      className="h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.kategori && (
                      <span
                        className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm"
                        style={{ backgroundColor: color.bg, color: color.text }}
                      >
                        {item.kategori}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-[15px] font-medium leading-snug text-[#0A3D6E]">
                    {item.judul}
                  </h3>

                  <div className="mt-4 flex items-center gap-2.5">
                    <Link href={`/user/detail/${item.id_buku}`} className="flex-1">
                      <button className="w-full rounded-lg bg-[#0A3D6E] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E4D8A]">
                        Detail
                      </button>
                    </Link>

                    <button
                      onClick={() => removeItem(item.id_buku)}
                      aria-label="Hapus dari wishlist"
                      className="flex h-[38px] w-[44px] items-center justify-center rounded-lg border border-[#D85A30]/40 text-[#D85A30] transition-colors hover:bg-[#D85A30] hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}