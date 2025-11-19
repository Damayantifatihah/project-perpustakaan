import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: "Email dan password wajib diisi!" }, { status: 400 });
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return Response.json({ error: "Email tidak ditemukan!" }, { status: 404 });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return Response.json({ error: "Password salah!" }, { status: 401 });
    }

    return Response.json({
      message: "Login berhasil!",
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
