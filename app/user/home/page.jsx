"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Search, BookOpen } from "lucide-react";

export default function HomePage() {
  const [buku, setBuku] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Ambil data buku
  const fetchBuku = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/buku", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      const data = await res.json();
      setBuku(data);
      setFiltered(data); // default
    } catch (error) {
      console.error("Gagal fetch buku:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuku();
  }, []);

  // Filter buku berdasarkan search
  useEffect(() => {
    const hasil = buku.filter((item) =>
      item.judul.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(hasil);
  }, [search, buku]);

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

  const categoryStyles = {
    novel: "bg-[#FBEAF0] text-[#993556]",
    pendidikan: "bg-[#E6F1FB] text-[#185FA5]",
    "non fiksi": "bg-[#EAF3DE] text-[#3B6D11]",
    komik: "bg-[#FAEEDA] text-[#854F0B]",
    sains: "bg-[#E1F5EE] text-[#0F6E56]",
    default: "bg-[#EEEDFE] text-[#534AB7]",
  };

  const getCategoryStyle = (kategori) =>
    categoryStyles[(kategori || "").toLowerCase()] || categoryStyles.default;

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
        .skeleton { animation: pulseSoft 1.4s ease-in-out infinite; }
      `}</style>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header band */}
        <div className="fade-up relative overflow-hidden rounded-3xl bg-[#0A3D6E] px-8 py-10">
          <div
            className="pointer-events-none absolute -top-16 -right-10 h-64 w-64 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, #D85A30 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #F4C77A 0%, transparent 70%)" }}
          />
          <div className="relative">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#F4C77A]">
              <BookOpen size={13} />
              Koleksi perpustakaan
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-white">
              Daftar Buku
            </h2>
            <p className="mt-1 text-sm text-[#BFD4EC]">
              Temukan dan pinjam buku favoritmu dari koleksi sekolah.
            </p>

            <div className="relative mt-6 max-w-md">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A6B2BF]"
              />
              <input
                type="text"
                placeholder="Cari judul buku..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white py-3 pl-11 pr-4 text-[14px] text-[#0A3D6E] placeholder:text-[#A6B2BF] outline-none transition-all duration-200 focus:border-[#D85A30] focus:shadow-[0_6px_16px_rgba(216,90,48,0.25)] focus:ring-2 focus:ring-[#D85A30]/30"
              />
            </div>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton rounded-2xl border border-[#ECE7DA] bg-white p-4">
                <div className="h-56 rounded-xl bg-[#F1EEE3]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[#F1EEE3]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-[#F1EEE3]" />
                <div className="mt-4 h-9 rounded-lg bg-[#F1EEE3]" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="fade-up mt-16 flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A3D6E]/8">
              <BookOpen size={28} className="text-[#0A3D6E]" />
            </div>
            <p className="mt-4 font-medium text-[#0A3D6E]">
              {search ? `Tidak ada buku untuk "${search}"` : "Belum ada buku tersedia"}
            </p>
            <p className="mt-1 text-sm text-[#5C6B7A]">
              {search ? "Coba kata kunci lain." : "Koleksi akan muncul di sini setelah ditambahkan."}
            </p>
          </div>
        )}

        {/* Book grid */}
        {!loading && filtered.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => {
              const isWishlisted = wishlist.some((x) => x.id_buku === item.id_buku);
              return (
                <div
                  key={item.id_buku}
                  className="fade-up group rounded-2xl border border-[#ECE7DA] bg-white p-4 shadow-[0_8px_24px_-12px_rgba(10,61,110,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-14px_rgba(10,61,110,0.28)]"
                  style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                >
                  <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-xl bg-[#F8F6EF]">
                    {item.gambar?.startsWith("http") ? (
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => (e.target.src = "/no-image.jpg")}
                      />
                    ) : (
                      <Image
                        src={item.gambar ? `/buku/${item.gambar}` : "/no-image.jpg"}
                        alt={item.judul}
                        width={150}
                        height={200}
                        className="h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => (e.target.src = "/no-image.jpg")}
                      />
                    )}
                    {item.kategori && (
                      <span className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm ${getCategoryStyle(item.kategori)}`}>
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
                      onClick={() => addToWishlist(item)}
                      aria-label="Tambah ke wishlist"
                      className={`flex h-[38px] w-[44px] items-center justify-center rounded-lg border transition-colors ${
                        isWishlisted
                          ? "border-[#D85A30] bg-[#D85A30] text-white"
                          : "border-[#D85A30]/40 text-[#D85A30] hover:bg-[#D85A30] hover:text-white"
                      }`}
                    >
                      <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
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