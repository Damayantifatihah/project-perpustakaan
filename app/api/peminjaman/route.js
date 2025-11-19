import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ===============================
// ========== POST ===============
// ===============================
export async function POST(req) {
  try {
    const {
      nama,
      telepon,
      kelas,
      tanggalPinjam,
      tanggalKembali,
      judulBuku,
      bukuId,
    } = await req.json();

    const query = `
      INSERT INTO peminjaman 
      (nama, telepon, kelas, tgl_pinjam, tgl_kembali, judul_buku, id_buku, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Proses')
    `;

    const values = [
      nama,
      telepon,
      kelas,
      tanggalPinjam,
      tanggalKembali,
      judulBuku,
      bukuId,
    ];

    const [result] = await pool.query(query, values);

    return NextResponse.json(
      { message: "Peminjaman berhasil", id: result.insertId },
      { status: 200 }
    );
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ===============================
// ============ GET ==============
// ===============================
export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT 
        id_pinjam,
        nama,
        judul_buku AS judulBuku,
        tgl_pinjam AS tanggalPinjam,
        status
      FROM peminjaman
      ORDER BY id_pinjam DESC`
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
