"use client";

import { useEffect, useState } from "react";

export default function DaftarPinjam() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/peminjaman");
        const json = await res.json();

        setData(Array.isArray(json) ? json : []);
      } catch (error) {
        console.error("Error fetch:", error);
        setData([]);
      }
    }

    fetchData();
  }, []);

  const badgeStatus = (status) => {
    if (status === "Selesai")
      return "bg-green-100 text-green-700 border border-green-300";
    if (status === "Dipinjam")
      return "bg-blue-100 text-blue-700 border border-blue-300";
    if (status === "Ditolak")
      return "bg-red-100 text-red-700 border border-red-300";

    return "bg-gray-100 text-gray-700 border border-gray-300";
  };

  return (
    <div className="w-full px-6 py-6 flex justify-center">
      <div className="w-full h-screen bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        
        <h1 className="text-2xl font-bold text-[#0A4E75] mb-6">
          Daftar Peminjaman
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-700 border-b">
                <th className="py-3 font-semibold">Nama Siswa</th>
                <th className="py-3 font-semibold">Judul Buku</th>
                <th className="py-3 font-semibold">Tanggal Pinjam</th>
                <th className="py-3 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    Belum ada data peminjaman.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id_pinjam} className="border-b text-gray-800">
                    <td className="py-3">{item.nama}</td>
                    <td className="py-3">{item.judulBuku}</td>
                    <td className="py-3">
                      {new Date(item.tanggalPinjam).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStatus(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
