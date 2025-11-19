import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { namaLengkap, email, kelasJurusan, telepon, password } = body;

    if (!namaLengkap || !email || !password) {
      return Response.json({ error: "Data tidak lengkap!" }, { status: 400 });
    }

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return Response.json({ error: "Email sudah terdaftar!" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (namaLengkap, email, kelasJurusan, telepon, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [namaLengkap, email, kelasJurusan || null, telepon || null, hashed, "siswa"]
    );

    return Response.json({ message: "Registrasi berhasil!" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message || "Terjadi kesalahan server" }, { status: 500 });
  }
}
