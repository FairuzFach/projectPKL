import { useState } from 'react';
import CustomSidebar from "./components/sidebar";
import Footer from "./components/footer";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KategoriPage = ({ kategoriDokumen }) => { 
  const [selectedKategori, setSelectedKategori] = useState('');
  const [dokumenByKategori, setDokumenByKategori] = useState([]);

  // Fungsi untuk menampilkan dokumen sesuai dengan kategori yang dipilih
  const handleSelectKategori = async (kategori) => {
    setSelectedKategori(kategori);
    try {
      const response = await fetch(`/api/kategori?kategori=${kategori}`);
      const data = await response.json();
      setDokumenByKategori(data);
    } catch (error) {
      console.error('Error fetching dokumen by kategori:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
    return formattedDate;
  };

  return (
    <div className="flex">
      <CustomSidebar/>
      <div className="flex-1">
        <div className="bg-white p-8 shadow-md rounded-md">
          <p className="text-2xl font-bold mb-4">Kategori Dokumen</p>
          {/* List semua kategori */}
          <div className="flex flex-wrap mb-4">
            {kategoriDokumen.map((kategori, index) => (
              <div key={index} className="mr-4 mb-2">
                <button 
                  onClick={() => handleSelectKategori(kategori)}
                  className={`p-2 border rounded-md ${selectedKategori === kategori ? 'bg-gray-300' : ''}`}
                >
                  {kategori}
                </button>
              </div>
            ))}
          </div>
          {/* List dokumen sesuai dengan kategori yang dipilih */}
          {selectedKategori && (
            <div>
              <p className="text-xl font-bold mb-2">Dokumen {selectedKategori}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dokumenByKategori.map((dokumen) => (
                  <div key={dokumen.id} className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">{dokumen.judul}</h3>
                    <p className="text-gray-600">{dokumen.kategori}</p>
                    <p className="text-gray-600">Tanggal: {formatDate(dokumen.tanggalDokumen)}</p>
                    {/* Tambahkan tombol atau link untuk men-download atau menampilkan detail dokumen */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default KategoriPage;

export async function getStaticProps() {
  const kategoriDokumen = await prisma.arsip.findMany({
    distinct: ['kategori'],
    select: {
      kategori: true,
    }
  }).then(result => result.map(({ kategori }) => kategori));

  return {
    props: {
      kategoriDokumen,
    },
  };
}
