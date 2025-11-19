import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req, context) {
  try {
    // params harus di-await!
    const { id } = await context.params;

    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status harus diisi" },
        { status: 400 }
      );
    }

    const query = `
      UPDATE peminjaman
      SET status = ?
      WHERE id_pinjam = ?
    `;

    await pool.query(query, [status, id]);

    return NextResponse.json(
      { message: "Status berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
