// pages/api/search.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ status: 'error', message: 'Query pencarian tidak valid' });
    }

    const results = await prisma.arsip.findMany({
      where: {
        OR: [
          { judul: { contains: query.toLowerCase() } },
          { kategori: { contains: query.toLowerCase() } },
        ],
      },
    });

    res.status(200).json({ status: 'success', results });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Gagal melakukan pencarian' });
  } finally {
    await prisma.$disconnect();
  }
}
