-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for magang
DROP DATABASE IF EXISTS `magang`;
CREATE DATABASE IF NOT EXISTS `magang` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `magang`;

-- Dumping structure for table magang.arsip
DROP TABLE IF EXISTS `arsip`;
CREATE TABLE IF NOT EXISTS `arsip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(191) NOT NULL,
  `kategori` varchar(191) NOT NULL,
  `file` varchar(191) NOT NULL,
  `tanggalDokumen` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Arsip_userId_fkey` (`userId`),
  CONSTRAINT `Arsip_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table magang.arsip: ~9 rows (approximately)
REPLACE INTO `arsip` (`id`, `judul`, `kategori`, `file`, `tanggalDokumen`, `userId`) VALUES
	(1, 'Berkas Pendaftaran', 'Berkas Daftar', 'Berkas Pendaftaran.pdf', '2024-02-25 15:55:45.603', 1),
	(2, 'Surat Undangan Pelaksanaan Workshop Media Digital Content Creator', 'Surat', 'Surat Undangan Pelaksanaan Workshop Media Digital Content Creator.pdf', '2024-02-25 15:57:09.731', 1),
	(3, 'Sertifikat Kedatangan Workshop Media Digital Content Creator', 'Sertifikat', 'Sertifikat Kedatangan Workshop Media Digital Content Creator.pdf', '2024-02-25 15:59:20.551', 1),
	(4, 'Laporan Pembagian Akomodasi Peserta Workshop', 'Kuitansi', 'Laporan Pembagian Akomodasi Peserta Workshop.pdf', '2024-02-25 16:00:02.383', 1),
	(5, 'Dokumentasi Kegiatan Workshop Media Digital Content Creator', 'Dokumentasi', 'Screenshot 2024-02-25 230115.png', '2024-02-25 16:01:39.721', 1),
	(6, 'Laporan Kegiatan Workshop oleh Peserta Magang', 'Laporan', 'Laporan Kegiatan Workshop oleh Peserta Magang.pdf', '2024-02-25 16:02:24.567', 1),
	(7, 'Kartu Peserta Magang Workshop', 'Kartu', 'Kartu Peserta Magang Workshop.pdf', '2024-02-25 16:02:55.138', 1),
	(8, 'Rangkuman Workshop Peserta Magang', 'Rangkuman', 'Rangkuman Workshop Peserta Magang.pdf', '2024-02-25 16:03:35.697', 1),
	(9, 'Berkas Pendaftaran Mahasiswa Magang Diskominfo Semarang', 'Berkas Daftar', 'Berkas Pendaftaran Mahasiswa Magang Diskominfo Semarang.pdf', '2024-02-25 16:35:06.345', 1);

-- Dumping structure for table magang.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `namaLengkap` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table magang.user: ~2 rows (approximately)
REPLACE INTO `user` (`id`, `username`, `email`, `password`, `namaLengkap`) VALUES
	(1, 'fairuz', 'fairuz@gmail.com', 'fairuz', 'Fairuz Fachrizal Adyatma'),
	(2, 'demo', 'demo@gmail.com', 'demo', 'Akun Demo');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
