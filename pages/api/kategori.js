// pages/api/dokumen.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'GET method only' });
  }

  const { kategori } = req.query;

  try {
    // Ambil dokumen berdasarkan kategori
    const dokumen = await prisma.arsip.findMany({
      where: {
        kategori: kategori,
      },
    });

    return res.status(200).json(dokumen);
  } catch (error) {
    console.error('Error fetching dokumen by kategori:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Terjadi kesalahan saat mengambil dokumen' });
  }
}
