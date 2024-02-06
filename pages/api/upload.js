// pages/api/upload.js
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();
const uploadFolder = 'public/uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name;
    const uniqueSuffix = '-' + Date.now() ;
    const fileExt = path.extname(file.originalname);
    const fileName = originalName + uniqueSuffix + fileExt;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // MAX SIZE 10MB
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    upload.single('fileDokumen')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Error saat mengunggah file:', err);
        return res.status(500).json({ status: 'error', message: 'Gagal mengunggah file' });
      } else if (err) {
        console.error('Error:', err);
        return res.status(500).json({ status: 'error', message: 'Terjadi kesalahan' });
      }

      const { judulDokumen, kategoriDokumen } = req.body;

      if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'File dokumen tidak ditemukan' });
      }

      const originalName = path.parse(req.file.originalname).name;
      const uniqueSuffix = Date.now() + '-';
      const fileExt = path.extname(req.file.originalname);
      const fileName = originalName + '-' + uniqueSuffix + fileExt;

      const arsip = await prisma.arsip.create({
        data: {
          judul: judulDokumen,
          kategori: kategoriDokumen,
          file: fileName,
          userId: 1,
        },
      });

      res.status(200).json({ status: 'success', arsip });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Gagal mengarsipkan dokumen' });
  }
}
