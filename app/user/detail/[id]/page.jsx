"use client";

import { Heart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DetailBuku() {
  const { id } = useParams();
  const router = useRouter();
  const [buku, setBuku] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/buku/${id}`);
        const data = await res.json();
        setBuku(data);
      } catch (error) {
        console.error("Error fetch detail:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  if (loading) {
    return <p className="flex justify-center p-6 text-black">Loading...</p>;
  }

  if (!buku) {
    return <p className="p-6 text-red-600">Buku tidak ditemukan.</p>;
  }

  const imagePath = `/buku/${buku.gambar}`;

  // ==========================
  // ADD TO WISHLIST FUNCTION
  // ==========================
  const addToWishlist = () => {
    let saved = localStorage.getItem("wishlist");
    let wishlist = saved ? JSON.parse(saved) : [];

    // Cek apakah buku sudah ada
    const exists = wishlist.some((item) => item.id_buku === buku.id_buku);

    if (!exists) {
      wishlist.push(buku);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // Redirect ke halaman wishlist
    router.push("/user/wishlist");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto text-black">
      {/* Judul */}
      <h1 className="text-3xl font-bold mb-8 text-center">{buku.judul}</h1>

      {/* Konten Utama */}
      <div className="flex flex-col md:flex-row gap-10">

        {/* Gambar Buku */}
        <div className="flex justify-center md:block">
          <Image
            src={imagePath}
            alt={buku.judul}
            width={280}
            height={380}
            className="rounded-xl shadow"
          />
        </div>

        {/* Detail */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md space-y-3 text-lg">
          <p><strong>Pengarang:</strong> {buku.pengarang}</p>
          <p><strong>Penerbit:</strong> {buku.penerbit}</p>
          <p><strong>Tahun Terbit:</strong> {buku.tahun_terbit}</p>
          <p><strong>Stok:</strong> {buku.stok}</p>
          <p><strong>Kategori:</strong> {buku.kategori}</p>

          {/* Tombol Love + Pinjam */}
          <div className="mt-6 flex gap-4">

            {/* Tombol Wishlist */}
            <button
              onClick={addToWishlist}
              className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
            >
              <Heart size={20} />
              Wishlist
            </button>

            {/* Tombol Pinjam */}
            <Link href={`/user/peminjaman/${id}`} className="flex-1">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition">
                Pinjam
              </button>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}
