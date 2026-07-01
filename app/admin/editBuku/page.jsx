"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function EditBukuContent() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    judul: "",
    pengarang: "",
    penerbit: "",
    tahun_terbit: "",
    stok: "",
    kategori: "",
    gambar: ""
  });

  // Ambil detail buku
  useEffect(() => {
    if (!id) return;

    // ✅ Tambahkan timestamp untuk bypass cache
    fetch(`/api/buku/${id}?t=${Date.now()}`, { 
      cache: 'no-store' 
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data buku loaded:", data);
        setBook(data);
        setFormData({
          judul: data.judul || "",
          pengarang: data.pengarang || "",
          penerbit: data.penerbit || "",
          tahun_terbit: data.tahun_terbit || "",
          stok: data.stok || "",
          kategori: data.kategori || "",
          gambar: data.gambar || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      console.log("Mengirim update untuk ID:", id);
      console.log("Payload:", formData);

      const response = await fetch(`/api/buku/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: 'no-store' // ✅ Bypass cache
      });

      const result = await response.json();
      console.log("📥 Response dari server:", result);

      if (response.ok) {
        alert("Buku berhasil diperbarui!");
        
        // Refresh halaman sebelum redirect untuk clear cache
        router.refresh();
        
        //  Gunakan setTimeout untuk memastikan refresh selesai
        setTimeout(() => {
          router.push(`/admin/kelolaBuku`);
        }, 100);
      } else {
        alert(`Gagal memperbarui buku: ${result.error || 'Unknown error'}`);
        console.error("Error response:", result);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm("Batalkan perubahan? Data yang belum disimpan akan hilang.")) {
      router.push("/admin/kelolaBuku");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0a4e75] mb-4"></div>
        <p className="text-lg text-gray-600">Memuat data buku...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Buku Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-6">Buku yang Anda cari tidak ditemukan dalam sistem.</p>
        <Link href="/admin/kelolaBuku">
          <button className="px-6 py-3 bg-[#0a4e75] text-white rounded-lg hover:bg-[#093d5a] transition">
            Kembali ke Daftar Buku
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-8">
          <Link
            href="/admin/kelolaBuku"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0a4e75] mb-4 transition group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Kembali ke Daftar Buku</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a4e75]">Edit Buku</h1>
          <p className="text-gray-600 mt-2">Perbarui informasi buku perpustakaan</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

              <div className="lg:col-span-1 bg-gradient-to-br from-[#0a4e75] to-[#093d5a] p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-xs">
                  <div className="bg-white rounded-xl shadow-2xl p-4 mb-4">
                    <img
                      src={
                        formData.gambar
                          ? formData.gambar.startsWith("http")
                            ? formData.gambar
                            : `/buku/${formData.gambar}`
                          : "/no-image.jpg"
                      }
                      alt={formData.judul}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => (e.target.src = "/no-image.jpg")}
                    />
                  </div>
                  <div className="text-center text-white">
                    <p className="text-sm opacity-90">Cover Buku</p>
                    <p className="text-xs opacity-75 mt-1">
                      {formData.gambar ? "Gambar tersedia" : "Tidak ada gambar"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">
                  Informasi Buku
                </h2>

                <div className="space-y-6">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Judul Buku <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="judul"
                      value={formData.judul}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a4e75] focus:border-transparent outline-none transition"
                      placeholder="Masukkan judul buku"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Penulis <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pengarang"
                        value={formData.pengarang}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a4e75] focus:border-transparent outline-none transition"
                        placeholder="Nama pengarang"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Penerbit <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="penerbit"
                        value={formData.penerbit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a4e75] focus:border-transparent outline-none transition"
                        placeholder="Nama penerbit"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tahun Terbit <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="tahun_terbit"
                        value={formData.tahun_terbit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a4e75] focus:border-transparent outline-none transition"
                        placeholder="2024"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stok <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stok"
                        value={formData.stok}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a4e75] focus:border-transparent outline-none transition"
                        placeholder="0"
                        required
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Kategori <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="kategori"
                        value={formData.kategori}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a4e75] focus:border-transparent outline-none transition"
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="Fiksi">Fiksi</option>
                        <option value="Non-Fiksi">Non-Fiksi</option>
                        <option value="Pendidikan">Pendidikan</option>
                        <option value="Teknologi">Teknologi</option>
                        <option value="Sejarah">Sejarah</option>
                        <option value="Biografi">Biografi</option>
                        <option value="Sains">Sains</option>
                        <option value="Agama">Agama</option>
                        <option value="Komik">Komik</option>
                        <option value="Novel">Novel</option>
                      </select>
                    </div>
                  </div>

                  {/* ✅ Tambahkan field URL Gambar */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      URL Gambar Cover
                    </label>
                    <input
                      type="text"
                      name="gambar"
                      value={formData.gambar}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a4e75] focus:border-transparent outline-none transition"
                      placeholder="https://example.com/cover.jpg atau nama-file.jpg"
                    />
                  
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t-2 border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 border-2 text-black border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-3 bg-[#0a4e75] text-white font-semibold rounded-lg hover:bg-[#093d5a] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {saving ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Menyimpan...
                      </span>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditBuku() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0a4e75] mb-4"></div>
        <p className="text-lg text-gray-600">Memuat...</p>
      </div>
    }>
      <EditBukuContent />
    </Suspense>
  );
}