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

    return NextResponse.json(rows[0], {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
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
    const { id } = await context.params; 
    const data = await req.json();

    console.log(" Update data received:", data);
    console.log(" ID buku:", id);

    
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

    const [result] = await pool.query(updateQuery, [
      data.judul,
      data.pengarang,
      data.penerbit,
      parseInt(data.tahun_terbit), 
      data.kategori,
      parseInt(data.stok), 
      data.gambar || null,
      id,
    ]);

    // Cek apakah ada row yang ter-update
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Buku tidak ditemukan atau tidak ada perubahan" },
        { status: 404 }
      );
    }

    console.log("✅ Update berhasil, affected rows:", result.affectedRows);

    return NextResponse.json({ 
      message: "Buku berhasil diperbarui",
      affectedRows: result.affectedRows 
    }, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error("API UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Gagal update buku", details: error.message },
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

    const [result] = await pool.query(deleteQuery, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: "Buku berhasil dihapus",
      affectedRows: result.affectedRows 
    });
  } catch (error) {
    console.error("API DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menghapus buku" },
      { status: 500 }
    );
  }
}