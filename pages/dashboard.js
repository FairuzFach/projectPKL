// pages/dashboard.js
import { PrismaClient } from '@prisma/client';
import CustomSidebar from "./components/sidebar";
import Footer from "./components/footer";

const prisma = new PrismaClient();

const DashboardPage = ({ totalArsip }) => { 


  return (
    <div className="flex">
    <CustomSidebar/>
      <div className="flex-1">
        <div className="bg-white p-8 shadow-md rounded-md">
          <p className="text-2xl font-bold mb-4">Selamat Datang di Aplikasi Arsip Digital !</p>
          {/* INFORMASI DOKUMEN */}
          <div className='bg-white-200 p-2 shadow-md rounded-md'>
            <p className="text-xl font-bold mb-2">JUMLAH DOKUMEN ARSIP</p>
            <p className="text-l font-bold mb-2 justify-center items-center">{totalArsip} Dokumen</p>
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
  return {
    props: {
      totalArsip,
    },
  };
}
