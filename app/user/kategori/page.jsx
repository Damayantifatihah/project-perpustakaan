"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tags, BookOpen } from "lucide-react";

export default function Kategori() {
  const [selectedCategory, setSelectedCategory] = useState("Novel");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data buku dari API
  useEffect(() => {
    setLoading(true);
    fetch("/api/buku")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("FETCH ERROR:", err))
      .finally(() => setLoading(false));
  }, []);

  // Ambil kategori unik
  const categories = [...new Set(books.map((b) => b.kategori))];

  // Filter buku berdasarkan kategori
  const filteredBooks = books.filter(
    (book) => book.kategori === selectedCategory
  );

  // Fungsi untuk mengambil gambar (eksternal / internal)
  const getImageSrc = (gambar) => {
    if (!gambar) return "/no-image.png";
    if (gambar.startsWith("http")) return gambar; // eksternal url
    return `/buku/${gambar}`; // internal upload
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
    <div className="min-h-screen bg-[#f9f9f9]">
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
              <Tags size={13} />
              Jelajahi per kategori
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-white">
              Kategori
            </h2>
            <p className="mt-1 text-sm text-[#BFD4EC]">
              Pilih kategori untuk melihat koleksi buku yang sesuai.
            </p>
          </div>
        </div>

        {/* Tombol kategori */}
        <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.06s" }}>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            const color = getCategoryColor(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200"
                style={
                  active
                    ? {
                        backgroundColor: "#0A3D6E",
                        color: "#FFFFFF",
                        boxShadow: "0 8px 20px -8px rgba(10,61,110,0.45)",
                        transform: "scale(1.04)",
                      }
                    : {
                        backgroundColor: color.bg,
                        color: color.text,
                      }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton rounded-2xl border border-[#ECE7DA] bg-white p-4">
                <div className="h-[220px] rounded-xl bg-[#F1EEE3]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[#F1EEE3]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-[#F1EEE3]" />
                <div className="mt-4 h-9 rounded-lg bg-[#F1EEE3]" />
              </div>
            ))}
          </div>
        )}

        {/* Daftar Buku */}
        {!loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, i) => {
                const color = getCategoryColor(book.kategori);
                return (
                  <div
                    key={book.id_buku}
                    className="fade-up group overflow-hidden rounded-2xl border border-[#ECE7DA] bg-white shadow-[0_8px_24px_-12px_rgba(10,61,110,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-14px_rgba(10,61,110,0.28)]"
                    style={{ animationDelay: `${Math.min(i, 10) * 0.04}s` }}
                  >
                    <div className="relative flex h-[220px] items-center justify-center bg-[#F8F6EF]">
                      {book.gambar?.startsWith("http") ? (
                        <img
                          src={getImageSrc(book.gambar)}
                          alt={book.judul}
                          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => (e.target.src = "/no-image.png")}
                        />
                      ) : (
                        <Image
                          src={getImageSrc(book.gambar)}
                          alt={book.judul}
                          width={300}
                          height={380}
                          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <span
                        className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm"
                        style={{ backgroundColor: color.bg, color: color.text }}
                      >
                        {book.kategori}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-[#0A3D6E]">
                        {book.judul}
                      </h3>

                      <Link href={`/user/detail/${book.id_buku}`}>
                        <button className="mt-4 w-full rounded-lg bg-[#0A3D6E] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E4D8A]">
                          Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="fade-up col-span-full flex flex-col items-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A3D6E]/8">
                  <BookOpen size={28} className="text-[#0A3D6E]" />
                </div>
                <p className="mt-4 font-medium text-[#0A3D6E]">
                  Tidak ada buku di kategori ini.
                </p>
                <p className="mt-1 text-sm text-[#5C6B7A]">
                  Coba pilih kategori lain di atas.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}