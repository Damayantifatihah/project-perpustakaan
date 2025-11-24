"use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, Edit, Search, Trash2 } from "lucide-react";

export default function KelolaBuku() {
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    judul: "",
    pengarang: "",
    penerbit: "",
    tahun_terbit: "",
    kategori: "",
    stok: "",
    gambar: "",
  });

  // FETCH BUKU
  const getBuku = async () => {
    try {
      const res = await fetch("/api/buku", { cache: "no-store" });
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

  // TAMBAH BUKU
  const handleSubmit = async () => {
    const res = await fetch("/api/buku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        judul: form.judul,
        pengarang: form.pengarang,
        penerbit: form.penerbit,
        tahun_terbit: form.tahun_terbit,
        kategori: form.kategori,
        stok: form.stok,
        gambar: form.gambar,
      }),
    });

    if (res.ok) {
      alert("Buku berhasil ditambahkan!");

      setForm({
        judul: "",
        pengarang: "",
        penerbit: "",
        tahun_terbit: "",
        kategori: "",
        stok: "",
        gambar: "",
      });

      getBuku();
    } else {
      alert("Gagal menambahkan buku");
    }
  };

  // DELETE BUKU
  const handleDelete = async (id, judul) => {
    if (!confirm(`Yakin ingin menghapus buku "${judul}"?`)) return;

    try {
      const res = await fetch(`/api/buku/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });

      if (res.ok) {
        alert("Buku berhasil dihapus!");
        getBuku();
      } else {
        alert("Gagal menghapus buku");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menghapus buku");
    }
  };

  // PENCARIAN
  const filteredBuku = buku.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.pengarang?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.penerbit?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kategori?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Kelola Buku</h1>
          </div>
          <p className="text-gray-600 ml-11">
            Tambah dan kelola koleksi buku perpustakaan Anda
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">

          <div className="flex items-center gap-2 mb-6">
            <Plus className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Tambah Buku Baru</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Judul */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Buku
                </label>
                <input
                  type="text"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500"
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                />
              </div>

              {/* Pengarang */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pengarang
                </label>
                <input
                  type="text"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500"
                  value={form.pengarang}
                  onChange={(e) => setForm({ ...form, pengarang: e.target.value })}
                />
              </div>

              {/* Penerbit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Penerbit
                </label>
                <input
                  type="text"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500"
                  value={form.penerbit}
                  onChange={(e) => setForm({ ...form, penerbit: e.target.value })}
                />
              </div>

              {/* Tahun */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tahun Terbit
                </label>
                <input
                  type="number"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500"
                  value={form.tahun_terbit}
                  onChange={(e) => setForm({ ...form, tahun_terbit: e.target.value })}
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori
                </label>
                <input
                  type="text"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500"
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                />
              </div>

              {/* Stok */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500"
                  value={form.stok}
                  onChange={(e) => setForm({ ...form, stok: e.target.value })}
                />
              </div>
            </div>

            {/* Gambar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Gambar Sampul
              </label>
              <input
                type="text"
                className="w-full border-2 text-black border-gray-200 p-3 rounded-lg focus:border-indigo-500"
                value={form.gambar}
                onChange={(e) => setForm({ ...form, gambar: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
            >
              Simpan Buku
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari buku..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-black bg-white focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* LIST */}
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
              {searchQuery ? "Tidak ada buku cocok" : "Belum ada buku tersedia"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBuku.map((item) => (
              <div
                key={item.id_buku}
                className="bg-white rounded-xl shadow-lg overflow-hidden border group flex flex-col hover:shadow-2xl transition"
              >
                <div className="relative h-80 bg-gray-100">
                  <img
                    src={
                      item.gambar
                        ? item.gambar.startsWith("http")
                          ? item.gambar
                          : `/buku/${item.gambar}`
                        : "/no-image.jpg"
                    }
                    alt={item.judul}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition"
                    onError={(e) => (e.target.src = "/no-image.jpg")}
                  />

                  <button
                    onClick={() => handleDelete(item.id_buku, item.judul)}
                    className="absolute top-3 left-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.kategori}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Stok: {item.stok || 0}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">
                    {item.judul}
                  </h3>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Pengarang:</span>{" "}
                    {item.pengarang || "-"}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Penerbit:</span>{" "}
                    {item.penerbit || "-"}
                  </p>

                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Tahun:</span>{" "}
                    {item.tahun_terbit || "-"}
                  </p>

                  <a
                    href={`/admin/editBuku?id=${item.id_buku}`}
                    className="mt-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg font-semibold shadow-md text-center hover:shadow-lg transition"
                  >
                    <Edit className="w-4 h-4 inline-block mr-2" />
                    Edit Buku
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}