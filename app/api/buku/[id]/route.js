import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { id } = await context.params; // ← WAJIB AWAIT

    console.log("ID:", id);

    const [rows] = await pool.query(
      `SELECT 
        id_buku,
        judul,
        pengarang,
        penerbit,
        tahun_terbit,
        kategori,
        stok,
        gambar
      FROM buku
      WHERE id_buku = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("API DETAIL ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
