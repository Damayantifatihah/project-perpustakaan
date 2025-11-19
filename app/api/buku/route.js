import { NextResponse } from "next/server";
import pool from "@/lib/db";

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
