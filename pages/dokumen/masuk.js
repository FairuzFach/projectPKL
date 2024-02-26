import { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';
import CustomSidebar from "./components/sidebar";
import axios from 'axios';
import Footer from "./components/footer";

const DokumenMasuk = () => {
  const router = useRouter();

  const [judulDokumen, setJudulDokumen] = useState("");
  const [kategoriDokumen, setKategoriDokumen] = useState("Surat");
  const [customKategori, setCustomKategori] = useState("");
  const [fileDokumen, setFileDokumen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI FORM TIDAK BOLEH KOSONG
    if (!judulDokumen) {
      toast.error("Pilih judul dokumen terlebih dahulu");
      return;
    } else if ((!kategoriDokumen || kategoriDokumen === "Custom") && !customKategori) {
      toast.error("Masukkan kategori dokumen terlebih dahulu");
      return;
    } else if (!fileDokumen) {
      toast.error("Pilih file dokumen terlebih dahulu");
      return;
    }

    // VALIDASI UKURAN FILE
    const fileSize = fileDokumen.size / (1024 * 1024);
    const maxSize = 10;

    if (fileSize > maxSize) {
      toast.error(`Ukuran file melebihi batas maksimum (${maxSize}MB)`);
      return;
    }

    const kategori = kategoriDokumen === "Kategori Lain" ? customKategori : kategoriDokumen;

    const formData = new FormData();
    formData.append("judulDokumen", judulDokumen);
    formData.append("kategoriDokumen", kategori);
    formData.append("fileDokumen", fileDokumen);

    try {
      const response = await axios.post("/api/upload", formData);

      if (response.data.status === 'success') {
        router.push("/dashboard");
        toast.success("Berhasil Mengarsipkan Dokumen");
      } else {
        toast.error("Gagal Mengarsipkan Dokumen");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat mengirim data");
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1">
        <div className="bg-white p-8 shadow-md rounded-md">
          <p className="text-2xl font-bold mb-4">Dokumen Arsip Masuk</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Judul Dokumen
              </label>
              <input
                placeholder='Masukkan Judul Dokumen'
                type="text"
                value={judulDokumen}
                onChange={(e) => setJudulDokumen(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Kategori Dokumen
              </label>
              <select
                value={kategoriDokumen}
                onChange={(e) => setKategoriDokumen(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              >
                <option value="Surat">Surat</option>
                <option value="Sertifikat">Sertifikat</option>
                <option value="Kuitansi">Kuitansi</option>
                <option value="Dokumentasi">Dokumentasi</option>
                <option value="Laporan">Laporan</option>
                <option value="Kartu">Kartu</option>
                <option value="Kategori Lain">Kategori Lain</option>
              </select>
              {kategoriDokumen === "Kategori Lain" && (
                <input
                  placeholder='Masukkan Kategori Dokumen'
                  type="text"
                  value={customKategori}
                  onChange={(e) => setCustomKategori(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                File Dokumen /*(max 10MB)*\
              </label>
              <input
                type="file"
                onChange={(e) => setFileDokumen(e.target.files[0])}
                className="mt-1 p-2 border rounded-md w-full"
                name="fileDokumen"
              />
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-3 py-2 rounded-md"
            >
              Kirim Dokumen
            </button>
          </form>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DokumenMasuk;
