// Simpan informasi pengguna ke dalam penyimpanan lokal
export const setSessionUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  
  // Ambil informasi pengguna dari penyimpanan lokal
  export const getSessionUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };
  
  // Hapus informasi pengguna dari penyimpanan lokal
  export const removeSessionUserData = () => {
    localStorage.removeItem('userData');
  };
  