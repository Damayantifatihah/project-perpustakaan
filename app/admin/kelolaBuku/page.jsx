"use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, Edit, Search } from "lucide-react";
import Link from "next/link";

export default function KelolaBuku() {
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    tahun: "",
    kategori: "",
    gambar: "",
  });

  // 🔥 Ambil semua buku dari database
  const getBuku = async () => {
    try {
      const res = await fetch("/api/buku");
      const data = await res.json();
      setBuku(data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal fetch buku:", error);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  // Submit tambah buku baru
  const handleSubmit = async () => {
    const res = await fetch("/api/buku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Buku berhasil ditambahkan!");
      setForm({
        judul: "",
        penulis: "",
        tahun: "",
        kategori: "",
        gambar: "",
      });
      getBuku();
    } else {
      alert("Gagal menambahkan buku");
    }
  };

  // Filter buku berdasarkan pencarian
  const filteredBuku = buku.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.pengarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Kelola Buku</h1>
          </div>
          <p className="text-gray-600 ml-11">Tambah dan kelola koleksi buku perpustakaan Anda</p>
        </div>

        {/* FORM TAMBAH BUKU BARU */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Tambah Buku Baru</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Buku
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul buku"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pengarang
                </label>
                <input
                  type="text"
                  placeholder="Nama penulis"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  value={form.penulis}
                  onChange={(e) => setForm({ ...form, penulis: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tahun Terbit
                </label>
                <input
                  type="number"
                  placeholder="2024"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  value={form.tahun}
                  onChange={(e) => setForm({ ...form, tahun: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori
                </label>
                <input
                  type="text"
                  placeholder="Fiksi, Non-Fiksi, dll"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Gambar Sampul
              </label>
              <input
                type="text"
                placeholder="https://example.com/cover.jpg"
                className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                value={form.gambar}
                onChange={(e) => setForm({ ...form, gambar: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Simpan Buku
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari buku berdasarkan judul, penulis, atau kategori..."
              className="w-full pl-10 pr-4 py-3 border-2 text-black border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* LIST SEMUA BUKU */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Daftar Buku
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({filteredBuku.length} buku)
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredBuku.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchQuery ? "Tidak ada buku yang sesuai dengan pencarian" : "Belum ada buku tersedia"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBuku.map((item) => (
              <div
                key={item.id_buku} // FIXED: pakai id_buku sebagai key
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group flex flex-col"
              >
                <div className="relative h-80 overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={
                      item.gambar?.startsWith("http") 
                        ? item.gambar 
                        : `/buku/${item.gambar}`
                    }
                    alt={item.judul}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                    onError={(e) => {
                      e.target.src = "/no-image.jpg";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.kategori}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                    {item.judul}
                  </h3>
                  
                  <div className="space-y-1 mb-4 flex-grow">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">Pengarang:</span> {item.pengarang}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">Tahun:</span> {item.tahun_terbit}
                    </p>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-auto"
                    onClick={() => (window.location.href = `/admin/buku/${item.id_buku}/edit`)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit Buku
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
