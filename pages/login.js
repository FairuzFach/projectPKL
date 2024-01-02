import { useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const loadingToast = toast.loading('Loading...');
      // PENGECEKAN SELAMA 1 DETIK
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // MENUTUP LOADING APABILA BERHASIL LOGIN
        toast.success('Login Berhasil !', { id: loadingToast });
        router.push('/dashboard');
      } else {
        // MENUTUP LOGIN APABILA LOGIN GAGAL
        toast.error(data.message || 'Username atau Password salah', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("Terjadi kesalahan selama login");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("background.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-3xl font-bold mb-4">Login Page</h1>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-black">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Masukkan Username'
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-black">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Masukkan Password'
            className="border w-full p-2 rounded-md"
            onKeyPress={handleKeyPress} // FUNGSI ENTER UNTUK LOGIN
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
        >
          Login
        </button>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default LoginPage;
