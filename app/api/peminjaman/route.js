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
      tgl_pinjam,
      tgl_kembali,
      judul_buku,
      id_buku
    } = await req.json();

    if (!nama || !telepon || !kelas || !tgl_pinjam || !tgl_kembali || !id_buku) {
      return NextResponse.json(
        { error: "Semua data wajib diisi!" },
        { status: 400 }
      );
    }

    // QUERY INSERT SESUAI STRUKTUR TABEL BARU
    const query = `
      INSERT INTO peminjaman 
      (nama, telepon, kelas, tgl_pinjam, tgl_kembali, judul_buku, id_buku, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Proses')
    `;

    const values = [
      nama,
      telepon,
      kelas,
      tgl_pinjam,
      tgl_kembali,
      judul_buku,
      id_buku
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
    const [rows] = await pool.query(`
      SELECT 
        p.id_pinjam,
        p.nama,
        p.telepon,
        p.kelas,
        p.tgl_pinjam,
        p.tgl_kembali,
        p.status,

        b.id_buku,
        b.judul AS judul_buku,
        b.pengarang,
        b.gambar AS gambar_buku

      FROM peminjaman p
      LEFT JOIN buku b ON p.id_buku = b.id_buku
      ORDER BY p.id_pinjam DESC
    `);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
