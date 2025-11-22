import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req, context) {
  const connection = pool;

  try {
    // WAJIB pake await
    const params = await context.params;
    const { id } = params;

    const { status } = await req.json();

    console.log(" PARAM:", id);
    console.log(" STATUS:", status);

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID dan status harus diisi" },
        { status: 400 }
      );
    }

    // CARI id_buku untuk update stok
    const [rows] = await connection.query(
      `SELECT id_buku FROM peminjaman WHERE id_pinjam = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Peminjaman tidak ditemukan" },
        { status: 404 }
      );
    }

    const id_buku = rows[0].id_buku;

    // MULAI TRANSAKSI
    await connection.query("START TRANSACTION");

    // UPDATE STATUS PEMINJAMAN
    await connection.query(
      `UPDATE peminjaman SET status = ? WHERE id_pinjam = ?`,
      [status, id]
    );

    // =======================
    // LOGIC STOK & PENGEMBALIAN
    // =======================

    // Jika status DIPINJAM → stok -1
    if (status === "Dipinjam") {
      await connection.query(
        `UPDATE buku SET stok = stok - 1 WHERE id_buku = ?`,
        [id_buku]
      );
    }

    // Jika status SELESAI → stok +1 DAN set tanggal kembali
    if (status === "Selesai") {
      await connection.query(
        `UPDATE buku SET stok = stok + 1 WHERE id_buku = ?`,
        [id_buku]
      );

      await connection.query(
        `UPDATE peminjaman SET tgl_kembali = CURDATE() WHERE id_pinjam = ?`,
        [id]
      );
    }

    await connection.query("COMMIT");

    return NextResponse.json({
      message: `Status peminjaman #${id} berhasil diperbarui menjadi '${status}'`,
    });
  } catch (err) {
    console.error(" PATCH ERROR:", err);

    try {
      await connection.query("ROLLBACK");
    } catch (_) {}

    return NextResponse.json(
      {
        error: "Gagal memperbarui status peminjaman",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
