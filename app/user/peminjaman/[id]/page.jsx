"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PeminjamanPage() {
  const { id } = useParams();
  const router = useRouter();

  const [buku, setBuku] = useState(null);
  const [loading, setLoading] = useState(true);

  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [kelas, setKelas] = useState("");
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");

  // Fetch detail buku
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/buku/${id}`);
        const data = await res.json();
        setBuku(data);
      } catch (error) {
        console.error("Error fetch peminjaman:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  // Auto hitung tanggal kembali
  const handleTanggalPinjam = (value) => {
    setTanggalPinjam(value);

    if (value) {
      const tanggal = new Date(value);
      tanggal.setDate(tanggal.getDate() + 7);

      const tahun = tanggal.getFullYear();
      const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
      const hari = String(tanggal.getDate()).padStart(2, "0");

      setTanggalKembali(`${tahun}-${bulan}-${hari}`);
    }
  };

  // Submit peminjaman
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataPeminjaman = {
      nama,
      telepon,
      kelas,
      tanggalPinjam,
      tanggalKembali,
      judulBuku: buku.judul,
      bukuId: id,
      status: "Menunggu Proses", // status default
    };

    try {
      const res = await fetch("/api/peminjaman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPeminjaman),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API ERROR:", errorData);
        return alert("Gagal memproses peminjaman.");
      }

      // Simpan username ke localStorage agar DaftarPinjam bisa filter
      localStorage.setItem("username", nama);

      // Redirect ke daftar pinjam
      router.push("/user/daftarpinjam");
    } catch (error) {
      console.error("Gagal submit:", error);
      alert("Terjadi kesalahan.");
    }
  };

  if (loading) return <p className="p-6 text-black">Loading...</p>;
  if (!buku) return <p className="p-6 text-red-600">Buku tidak ditemukan.</p>;

  return (
    <div className="p-6 flex justify-center w-full">
      <div className="w-full max-w-[900px] bg-white p-7 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#0A4E75]">
          Form Peminjaman Buku
        </h1>

        <div className="bg-[#0A4E75] text-white p-4 rounded-lg mb-6 text-sm">
          <p><strong>Judul:</strong> {buku.judul}</p>
          <p><strong>Pengarang:</strong> {buku.pengarang}</p>
          <p><strong>Penerbit:</strong> {buku.penerbit}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama Peminjam</label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border border-gray-300 text-black px-4 py-2 rounded-lg"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">No. Telepon</label>
            <input
              type="number"
              required
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              className="w-full border border-gray-300 text-black px-4 py-2 rounded-lg"
              placeholder="08xxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Kelas / Jurusan</label>
            <input
              type="text"
              required
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full border border-gray-300 text-black px-4 py-2 rounded-lg"
              placeholder="Contoh: XI RPL 2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Tanggal Pinjam</label>
            <input
              type="date"
              required
              value={tanggalPinjam}
              onChange={(e) => handleTanggalPinjam(e.target.value)}
              className="w-full border border-gray-300 text-black px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Tanggal Kembali</label>
            <input
              type="date"
              value={tanggalKembali}
              disabled
              className="w-full border border-gray-300 text-black px-4 py-2 rounded-lg bg-gray-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              *Tanggal kembali otomatis (maksimal 1 minggu)*
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Judul Buku</label>
            <input
              type="text"
              value={buku.judul}
              disabled
              className="w-full border border-gray-300 text-black px-4 py-2 rounded-lg bg-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-semibold"
          >
            Pinjam Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}
