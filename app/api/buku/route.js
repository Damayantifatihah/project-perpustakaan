import { NextResponse } from "next/server";
import pool from "@/lib/db";

// =======================
// GET → Ambil semua buku
// =======================
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id_buku,
        judul,
        pengarang,
        penerbit,
        tahun_terbit,
        kategori,
        stok,
        gambar
      FROM buku
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("API BUKU ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data buku" },
      { status: 500 }
    );
  }
}

// =======================
// POST → Tambah buku baru
// =======================
export async function POST(req) {
  try {
    const {
      judul,
      pengarang,
      penerbit,
      tahun_terbit,
      kategori,
      stok,
      gambar,
    } = await req.json();

    const insertQuery = `
      INSERT INTO buku (judul, pengarang, penerbit, tahun_terbit, kategori, stok, gambar)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(insertQuery, [
      judul,
      pengarang,
      penerbit,
      tahun_terbit,
      kategori,
      stok,
      gambar,
    ]);

    return NextResponse.json(
      { message: "Buku berhasil ditambahkan" },
      { status: 201 }
    );
  } catch (error) {
    console.error("API BUKU POST ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menambah buku" },
      { status: 500 }
    );
  }
}
