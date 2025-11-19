"use client";

import { Book, Layers, BookmarkCheck, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [statistik, setStatistik] = useState({
    totalBuku: 0,
    totalKategori: 0,
    dipinjam: 0,
    tersedia: 0,
  });
  const [aktivitas, setAktivitas] = useState([]);

  useEffect(() => {
    fetchStatistik();
    fetchAktivitas();
  }, []);

  // ========================
  //   FETCH STATISTIK
  // ========================
  async function fetchStatistik() {
    try {
      const bukuRes = await fetch("/api/buku");
      const buku = bukuRes.ok ? await bukuRes.json() : [];

      const kategoriRes = await fetch("/api/kategori");
      const kategori = kategoriRes.ok ? await kategoriRes.json() : [];

      const peminjamanRes = await fetch("/api/peminjaman");
      const peminjaman = peminjamanRes.ok ? await peminjamanRes.json() : [];

      const dipinjamCount = peminjaman.filter(p => p.status === "Dipinjam").length;
      const tersediaCount = buku.length - dipinjamCount;

      setStatistik({
        totalBuku: buku.length,
        totalKategori: kategori.length,
        dipinjam: dipinjamCount,
        tersedia: tersediaCount,
      });
    } catch (error) {
      console.error("Gagal fetch statistik:", error);
    }
  }

  // ========================
  //  FETCH AKTIVITAS TERBARU
  // ========================
  async function fetchAktivitas() {
    try {
      const res = await fetch("/api/peminjaman?recent=true");
      const peminjaman = res.ok ? await res.json() : [];

      const recent = peminjaman.map(p => ({
        id: p.id_pinjam, // =================== FIX PALING PENTING
        nama: p.nama,
        judul: p.judul_buku,
        status: p.status,
        waktu: new Date(p.tgl_pinjam).toLocaleString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setAktivitas(recent);
    } catch (error) {
      console.error("Gagal fetch aktivitas:", error);
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

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal update status");

      fetchAktivitas();
      fetchStatistik();
    } catch (error) {
      console.error(error);
      alert("Gagal update status!");
    }
  }

  return (
    <div className="p-7">
      <h1 className="text-3xl font-bold text-[#0A4E75] mb-6">Dashboard Admin</h1>

      {/* Statistik Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card icon={<Book size={32} />} color="blue" label="Total Buku" value={statistik.totalBuku} />
        <Card icon={<Layers size={32} />} color="yellow" label="Total Kategori" value={statistik.totalKategori} />
        <Card icon={<BookmarkCheck size={32} />} color="red" label="Sedang Dipinjam" value={statistik.dipinjam} />
        <Card icon={<CheckCircle size={32} />} color="green" label="Buku Tersedia" value={statistik.tersedia} />
      </div>

      {/* Aktivitas */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-[#0A4E75] mb-4">Aktivitas Terbaru</h2>

        <ul className="space-y-4">
          {aktivitas.length === 0 ? (
            <p className="text-gray-500">Belum ada aktivitas.</p>
          ) : (
            aktivitas.map(a => (
              <li
                key={a.id}
                className="p-4 rounded-lg bg-gray-50 border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
              >
                <div>
                  <p className="text-gray-700 mb-1">
                    📘 <strong>{a.judul}</strong> oleh <strong>{a.nama}</strong>
                  </p>
                  <span className="text-gray-500 text-sm">{a.waktu}</span>

                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        a.status === "Dipinjam"
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : a.status === "Ditolak"
                          ? "bg-red-100 text-red-700 border border-red-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                </div>

                {/* Button Proses */}
                {a.status === "Proses" && (
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => updateStatus(a.id, "Dipinjam")}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Dipinjamkan
                    </button>

                    <button
                      onClick={() => updateStatus(a.id, "Ditolak")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Ditolak
                    </button>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

// ========================
//    CARD COMPONENT
// ========================
function Card({ icon, color, label, value }) {
  return (
    <div className="bg-white p-6 shadow-md rounded-xl border flex items-center gap-4">
      <div className={`p-4 rounded-lg bg-${color}-100 text-${color}-600`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
