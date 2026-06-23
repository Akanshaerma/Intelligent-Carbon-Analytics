import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-6 mt-auto border-t border-gray-800 w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        
        {/* Left Side: Brand Name & Copyright */}
        <div>
          <p className="text-sm font-medium text-gray-300 flex items-center justify-center sm:justify-start gap-2">
            <span>🌿</span> Eco-Health Track Dashboard
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © {currentYear} All Rights Reserved. Track your carbon & vitals.
          </p>
        </div>

        {/* Right Side: Quick Status Indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Frontend Deployed (Vercel)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>API Connected (Render)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
