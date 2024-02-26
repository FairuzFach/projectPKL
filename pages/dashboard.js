import { PrismaClient } from '@prisma/client';
import CustomSidebar from "./components/sidebar";
import Footer from "./components/footer";
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

const DashboardPage = ({ totalArsip,totalKategori }) => { 
  const [runningText, setRunningText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Kunjungi Website Resmi Diskominfo Semarang di Website Resmi Diskominfo Semarang',
  'Baca Pembaruan Berita dan Artikel tentang Diskominfo Kota Semarang di Website Resmi Diskominfo Semarang',
  'Website Resmi Diskominfo Kota Semarang: https://diskominfo.semarangkota.go.id/'];

  useEffect(() => {
    const interval = setInterval(() => {
      setRunningText(texts[textIndex]);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [textIndex]);

  return (
    <div className="flex">
      <CustomSidebar/>
      <div className="flex-1">
        <div className="bg-white p-8 shadow-md rounded-md">
          <p className="text-3xl font-bold mb-4 text-center">Selamat Datang di Aplikasi Arsip Digital!</p>
          <div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-6">
            {/* Total Dokumen */}
            <div className="p-6 bg-white">
              <p className="text-xl font-bold mb-2">Total Dokumen Arsip</p>
              <p className="text-2xl font-bold text-gray-700">{totalArsip} Dokumen</p>
            </div>
            {/* Total Kateghori Dokumen */}
            <div className="p-6 bg-white">
              <p className="text-xl font-bold mb-2">Total Kategori Dokumen Arsip</p>
              <p className="text-2xl font-bold text-gray-700">{totalKategori} Kategori</p>
            </div>
          </div>
          {/* Running Text */}
          <div className="p-6 bg-white">
            <marquee direction="left">{runningText}</marquee>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;

export async function getStaticProps() {
  const totalArsip = await prisma.arsip.count();
  const uniqueKategori = await prisma.arsip.findMany({
    distinct: ['kategori']
  });
  const totalKategori = uniqueKategori.length;

  return {
    props: {
      totalArsip,
      totalKategori,
    },
  };
}
