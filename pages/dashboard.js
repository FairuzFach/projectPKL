// pages/dashboard.js
import { useRouter } from "next/router";
import CustomSidebar from "./components/sidebar";

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.push('/login');
  }

  return (
    <div className="flex">
    <CustomSidebar/>
      <div className="flex-1">
        <div className="bg-white p-8 shadow-md rounded-md">
          <p className="text-2xl font-bold mb-4">Selamat Datang di Aplikasi Arsip Digital!</p>
          {/* INFORMASI DOKUMEN */}
          <p className="text-l font-bold mb-2">JUMLAH DOKUMEN ARSIP</p>
          <p className="text-s font-bold mb-2">lorem ipsum Dokumen</p>
          <p className="text-l font-bold mb-2">JUMLAH KATEGORI ARSIP</p>
          <p className="text-s font-bold mb-2">lorem ipsum Dokumen</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;