import pool from "@/lib/db";
import { NextResponse } from "next/server";

// =======================
// GET → Detail buku
// =======================
export async function GET(req, context) {
  try {
    const { id } = await context.params;

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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// =======================
// PUT → Update buku
// =======================
export async function PUT(req, context) {
  try {
    const { id } = context.params;
    const data = await req.json();

    const updateQuery = `
      UPDATE buku SET
        judul = ?,
        pengarang = ?,
        penerbit = ?,
        tahun_terbit = ?,
        kategori = ?,
        stok = ?,
        gambar = ?
      WHERE id_buku = ?
    `;

    await pool.query(updateQuery, [
      data.judul,
      data.pengarang,
      data.penerbit,
      data.tahun_terbit,
      data.kategori,
      data.stok,
      data.gambar,
      id,
    ]);

    return NextResponse.json({ message: "Buku berhasil diperbarui" });
  } catch (error) {
    console.error("API UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Gagal update buku" },
      { status: 500 }
    );
  }
}

// =======================
// DELETE → Hapus buku
// =======================
export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    const deleteQuery = `DELETE FROM buku WHERE id_buku = ?`;

    await pool.query(deleteQuery, [id]);

    return NextResponse.json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    console.error("API DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menghapus buku" },
      { status: 500 }
    );
  }
}
