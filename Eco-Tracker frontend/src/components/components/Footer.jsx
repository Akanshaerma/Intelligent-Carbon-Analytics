import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-4 px-4 text-xs mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>
          <p className="font-semibold text-gray-300">🌿 Eco-Track Analytics Index</p>
          <p className="text-gray-500 text-[11px] mt-0.5">© {new Date().getFullYear()} Carbon and Biometrics sync matrix layer.</p>
        </div>
        <div className="flex space-x-4 text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1">🟢 Vercel Web App</span>
          <span className="text-blue-400 flex items-center gap-1">🟢 MongoDB Atlas Cluster</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
