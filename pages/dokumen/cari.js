// pages/cari.js
import { useState } from 'react';
import CustomSidebar from './components/sidebar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Footer from "./components/footer";

const CariDokumen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error("Kolom pencarian tidak boleh kosong");
      return;
    }

    try {
      const response = await axios.get(`/api/search?query=${searchTerm}`);
      setSearchResults(response.data.results);
      if (response.data.results.length === 0) {
        toast.error("Tidak ada hasil pencarian");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
    return formattedDate;
  };

  const handleDownload = async (file) => {
    try {
      const response = await axios.get(`/api/download?file=${file}`, { responseType: 'arraybuffer' });
  
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.success('Berhasil mendownload dokumen');
      // toast.promise(
      //   handleDownload(file), {
      //     loading: 'Downloading...',
      //     success: <b>Dokumen berhasil di Download</b>,
      //     error: <b>Dokumen gagal di Download</b>,
      //   }
      // );
    }
  };

  const handleDelete = async (id) => {
  toast.promise(
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`/api/delete`, {
          data: { id },
        });

        if (response.data.status === 'success') {
          resolve();
        } else {
          reject(new Error('Gagal menghapus dokumen'));
        }
      } catch (error) {
        console.error('Error deleting document:', error);
        reject(new Error('Terjadi kesalahan saat menghapus dokumen'));
      }
    }),
    {
      loading: 'Menghapus dokumen...',
      success: <b>Dokumen berhasil dihapus</b>,
      error: <b>Gagal menghapus dokumen</b>,
    }
  );
};


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1">
        <div className="bg-white p-8 shadow-md rounded-md">
          <p className="text-2xl font-bold mb-4">Pencarian Dokumen Arsip</p>
          <div className="mb-4 flex space-x-2">
            <input
              type="text"
              placeholder="Masukkan kata kunci pencarian"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md flex-1"
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="bg-red-500 text-white px-3 py-2 rounded-md"
            >
              Cari
            </button>
          </div>
          {searchResults.length > 0 ? (
          <table className="w-full border-collapse rounded-md overflow-hidden">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="border p-2">Judul</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Tanggal Dokumen</th>
                <th className="border p-2"></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.id}>
                  <td className="border p-2 border-black">{result.judul}</td>
                  <td className="border p-2 border-black">{result.kategori}</td>
                  <td className="border p-2 border-black">{formatDate(result.tanggalDokumen)}</td>
                  <td className="border p-2 border-black">
                    <select
                     className="p-2 border rounded-md bg-white shadow-md"
                     onChange={(e) => {
                      const action = e.target.value;
                      if (action === 'delete') {
                        handleDelete(result.id);
                      } else if (action === 'download') {
                        handleDownload(result.file);
                      }
                    }}>
                      <option value="">Aksi</option>
                      <option value="download">Download</option>
                      <option value="delete">Hapus</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (null)}
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <Footer />
      </div>
    </div>
  );
};

export default CariDokumen;