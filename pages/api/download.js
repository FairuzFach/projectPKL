// pages/api/download.js
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();
const uploadFolder = 'public/uploads/';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { file } = req.query;

  try {
    const filePath = path.join(process.cwd(), uploadFolder, file);

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ status: 'error', message: 'File not found' });
    }

    // Baca file dan kirimkan sebagai respons
    const fileData = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${file}`);
    res.send(fileData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to download file' });
  }
}
