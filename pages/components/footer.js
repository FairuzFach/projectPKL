// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-white-800 text-black py-4 w-full fixed bottom-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1">
          <div className="col-span-full md:col-span-6">
            <p className="text-center">&copy; 2024 Aplikasi Arsip Digital. All rights reserved. Made with <a href="https://instagram.com/iruzzfairuz" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">❤️</a> by Fairuz</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
