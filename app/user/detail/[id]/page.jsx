"use client";

import { Heart, ArrowLeft, BookOpen, User, Building2, CalendarDays, Layers } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DetailBuku() {
  const { id } = useParams();
  const router = useRouter();
  const [buku, setBuku] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/buku/${id}`);
        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          setBuku(null);
        } else {
          setBuku({
            id_buku: data.id_buku || data.id || id,
            judul: data.judul || "",
            pengarang: data.pengarang || "",
            penerbit: data.penerbit || "-",
            tahun_terbit: data.tahun_terbit || "-",
            stok: data.stok ?? "-",
            kategori: data.kategori || "-",
            gambar: data.gambar || "",
          });
        }
      } catch (error) {
        console.error("Error fetch detail:", error);
        setBuku(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (!buku) return;
    const saved = localStorage.getItem("wishlist");
    const wishlist = saved ? JSON.parse(saved) : [];
    setIsWishlisted(wishlist.some((item) => item.id_buku === buku.id_buku));
  }, [buku]);

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

  // ==========================
  // ADD TO WISHLIST FUNCTION
  // ==========================
  const addToWishlist = () => {
    let saved = localStorage.getItem("wishlist");
    let wishlist = saved ? JSON.parse(saved) : [];

    const exists = wishlist.some((item) => item.id_buku === buku.id_buku);

    if (!exists) {
      wishlist.push(buku);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    router.push("/user/wishlist");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] px-6 py-10">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mx-auto h-8 w-2/3 rounded bg-[#ECE7DA]" />
          <div className="mt-10 flex flex-col gap-8 md:flex-row">
            <div className="mx-auto h-[380px] w-[280px] rounded-xl bg-[#ECE7DA]" />
            <div className="flex-1 space-y-4 rounded-2xl border border-[#ECE7DA] bg-white p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-3/4 rounded bg-[#ECE7DA]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!buku) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F4EC] px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D85A30]/10">
          <BookOpen size={28} className="text-[#D85A30]" />
        </div>
        <p className="mt-4 font-medium text-[#0A3D6E]">Buku tidak ditemukan.</p>
        <p className="mt-1 text-sm text-[#5C6B7A]">
          Buku ini mungkin sudah dihapus atau tautannya salah.
        </p>
        <Link href="/user/home">
          <button className="mt-5 rounded-lg bg-[#0A3D6E] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E4D8A]">
            Kembali ke daftar buku
          </button>
        </Link>
      </div>
    );
  }

  const imagePath = buku.gambar;
  const color = getCategoryColor(buku.kategori);

  const meta = [
    { label: "Pengarang", value: buku.pengarang || "-", icon: User },
    { label: "Penerbit", value: buku.penerbit, icon: Building2 },
    { label: "Tahun terbit", value: buku.tahun_terbit, icon: CalendarDays },
    { label: "Stok", value: buku.stok, icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EC]">
      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <button
          onClick={() => router.back()}
          className="fade-up mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#5C6B7A] transition-colors hover:text-[#0A3D6E]"
        >
          <ArrowLeft size={16} />
          Kembali
        </button>

        <div className="flex flex-col gap-10 md:flex-row">
          {/* Gambar Buku */}
          <div className="fade-up flex justify-center md:block" style={{ animationDelay: "0.05s" }}>
            <div className="overflow-hidden rounded-2xl border border-[#ECE7DA] bg-white p-4 shadow-[0_12px_30px_-14px_rgba(10,61,110,0.25)]">
              {imagePath?.startsWith("http") ? (
                <img
                  src={imagePath}
                  alt={buku.judul}
                  width={260}
                  height={360}
                  className="rounded-lg object-contain"
                  onError={(e) => { e.target.src = "/no-image.jpg"; }}
                />
              ) : (
                <img
                  src={imagePath ? `/buku/${imagePath}` : "/no-image.jpg"}
                  alt={buku.judul}
                  width={260}
                  height={360}
                  className="rounded-lg object-contain"
                  onError={(e) => { e.target.src = "/no-image.jpg"; }}
                />
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="fade-up flex-1 rounded-2xl border border-[#ECE7DA] bg-white p-7 shadow-[0_12px_30px_-16px_rgba(10,61,110,0.2)]" style={{ animationDelay: "0.1s" }}>
            <span
              className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium"
              style={{ backgroundColor: color.bg, color: color.text }}
            >
              {buku.kategori}
            </span>

            <h1 className="mt-3 font-serif text-[26px] font-semibold leading-snug text-[#0A3D6E]">
              {buku.judul}
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {meta.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A3D6E]/8 text-[#0A3D6E]">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-[#9AA6B1]">{label}</p>
                    <p className="text-[14px] font-medium text-[#0A3D6E]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Wishlist + Pinjam */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={addToWishlist}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  isWishlisted
                    ? "border-[#D85A30] bg-[#D85A30] text-white"
                    : "border-[#D85A30]/40 text-[#D85A30] hover:bg-[#D85A30] hover:text-white"
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                Wishlist
              </button>

              <Link href={`/user/peminjaman/${id}`} className="flex-1">
                <button className="w-full rounded-lg bg-[#0A3D6E] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0E4D8A]">
                  Pinjam
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}