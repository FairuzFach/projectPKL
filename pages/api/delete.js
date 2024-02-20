// pages/api/delete.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'DELETE method only' });
  }

  const { id } = req.body;

  try {
    // Hapus dokumen berdasarkan ID
    await prisma.arsip.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ status: 'success', message: 'Dokumen berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan saat menghapus dokumen' });
  }
}
