// pages/api/login.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Lakukan validasi login berdasarkan username dan password dari database
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (user) {
      // Berhasil login
      res.status(200).json({ success: true, message: 'Login berhasil' });
    } else {
      // Gagal login
      res.status(401).json({ success: false, message: 'Username atau Password salah' });
    }
  } else {
    res.status(405).end();
  }
}
