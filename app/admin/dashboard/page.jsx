"use client";

import { Book, Layers, BookmarkCheck, CheckCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [statistik, setStatistik] = useState({
    totalBuku: 0,
    totalKategori: 0, // dipakai untuk total dikembalikan
    dipinjam: 0,
    tersedia: 0,
  });

  const [peminjaman, setPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistik();
    fetchPeminjaman();
  }, []);

  // ========================
  //   FETCH STATISTIK
  // ========================
  async function fetchStatistik() {
    try {
      // Fetch buku
      const bukuRes = await fetch("/api/buku");
      const buku = bukuRes.ok ? await bukuRes.json() : [];

      // Fetch peminjaman
      const peminjamanRes = await fetch("/api/peminjaman");
      const peminjamanData = peminjamanRes.ok ? await peminjamanRes.json() : [];

      // Hitung dipinjam
      const dipinjamCount = Array.isArray(peminjamanData)
        ? peminjamanData.filter((p) => p.status === "Dipinjam").length
        : 0;

      // Hitung dikembalikan
      const dikembalikanCount = Array.isArray(peminjamanData)
        ? peminjamanData.filter((p) => p.status === "Dikembalikan").length
        : 0;

      // Hitung tersedia
      const tersediaCount = Array.isArray(buku)
        ? buku.length - dipinjamCount
        : 0;

      // Set statistik
      setStatistik({
        totalBuku: Array.isArray(buku) ? buku.length : 0,
        totalKategori: dikembalikanCount,   // ← sekarang menampilkan total dikembalikan
        dipinjam: dipinjamCount,
        tersedia: tersediaCount,
      });
    } catch (error) {
      console.error("Gagal fetch statistik", error);
    }
  }

  // ========================
  //  FETCH PEMINJAMAN
  // ========================
  async function fetchPeminjaman() {
    try {
      setLoading(true);
      const res = await fetch("/api/peminjaman");
      const data = res.ok ? await res.json() : [];
      setPeminjaman(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal fetch peminjaman", error);
      setPeminjaman([]);
    } finally {
      setLoading(false);
    }
  }

  // ========================
  //        UPDATE STATUS
  // ========================
  async function updateStatus(id, newStatus) {
    if (!id) return alert("ID peminjaman tidak valid!");

    try {
      const res = await fetch(`/api/peminjaman/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Server error:", data);
        alert(data.error || "Gagal update status");
        return;
      }

      alert("Status berhasil diupdate!");

      fetchPeminjaman();
      fetchStatistik();
    } catch (error) {
      console.error("Error updateStatus:", error);
      alert("Gagal update status!");
    }
  }

  // Format tanggal
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";
    const d = new Date(tanggal);
    if (isNaN(d)) return "-";
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola peminjaman dan statistik perpustakaan</p>
        </div>

        {/* Statistik Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card icon={<Book size={32} />} color="blue" label="Total Buku" value={statistik.totalBuku} />
          <Card icon={<Layers size={32} />} color="purple" label="Sudah Dikembalikan" value={statistik.totalKategori} />
          <Card icon={<BookmarkCheck size={32} />} color="orange" label="Sedang Dipinjam" value={statistik.dipinjam} />
          <Card icon={<CheckCircle size={32} />} color="green" label="Buku Tersedia" value={statistik.tersedia} />
        </div>

        {/* Tabel Peminjaman */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Data Peminjaman Buku</h2>
            </div>
            <p className="text-gray-600 mt-1 ml-9">Kelola semua peminjaman buku perpustakaan</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : peminjaman.length === 0 ? (
            <div className="p-12 text-center">
              <BookmarkCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada data peminjaman</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Siswa</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kelas</th>

                    {/* ➕ TELEPON BARU */}
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Telepon</th>

                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Buku</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Pinjam</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tgl Kembali</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {peminjaman.map((item, index) => (
                    <tr key={item.id_pinjam} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.kelas}
                        </span>
                      </td>

                      {/* ➕ TELEPON BARU */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.telepon || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.gambar_buku?.startsWith("http") ? item.gambar_buku : `/buku/${item.gambar_buku}`}
                            alt={item.judul_buku}
                            className="w-12 h-16 object-cover rounded shadow-sm"
                            onError={(e) => { e.target.src = "/no-image.jpg"; }}
                          />
                          <div className="max-w-xs">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.judul_buku}</div>
                            <div className="text-xs text-gray-500">{item.pengarang}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatTanggal(item.tgl_pinjam)}</td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatTanggal(item.tgl_kembali)}</td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                            item.status === "Dipinjam"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "Ditolak"
                              ? "bg-red-100 text-red-800"
                              : item.status === "Dikembalikan"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          {item.status === "Proses" && (
                            <>
                              <button
                                onClick={() => updateStatus(item.id_pinjam, "Dipinjam")}
                                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                              >
                                Setujui
                              </button>
                              <button
                                onClick={() => updateStatus(item.id_pinjam, "Ditolak")}
                                className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                              >
                                Tolak
                              </button>
                            </>
                          )}

                          {item.status === "Menunggu Proses" && (
                            <button
                              onClick={() => updateStatus(item.id_pinjam, "Dikembalikan")}
                              className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                              Konfirmasi
                            </button>
                          )}

                          {(item.status === "Dikembalikan" || item.status === "Ditolak") && (
                            <span className="text-xs text-gray-400 italic">Selesai</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========================
//    CARD COMPONENT
// ========================
function Card({ icon, color, label, value }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        <div>
          <p className="text-gray-500 text-sm mb-1">{label}</p>
          <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        </div>
      </div>
    </div>
  );
}
