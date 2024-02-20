// pages/api/login.js
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // VALIDASI LOGIN BERDASARKAN USER DARI DATABASE
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (user) {
      if (!req.session) {
        req.session = {};
      }
      // Berhasil login
      req.session.user = { username: user.username, namaLengkap: user.namaLengkap, email: user.email };
      res.status(200).json({ success: true, message: 'Login berhasil' });
    } else {
      // Gagal login
      res.status(401).json({ success: false, message: 'Username atau Password salah' });
    }
  } else {
    res.status(405).end();
  }
}
