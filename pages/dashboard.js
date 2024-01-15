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
          <h1 className="text-3xl font-bold mb-4">Dashboard Page</h1>
          <p className="text-lg">Selamat datang di dashboard!</p>
        </div>
        <div className="logout text-3xl font-bold m-4">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;