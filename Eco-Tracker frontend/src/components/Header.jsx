import React, { useState } from 'react';

const Header = ({ userProfile, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Default fallback values agar user profile state abhi pass na ho rahi ho
  const profile = userProfile || {
    name: "User Profile",
    email: "user@ecotrack.com",
    age: "24",
    height: "175",
    weight: "70",
    bloodGroup: "O+"
  };

  return (
    <header className="bg-emerald-600 text-white shadow-md px-6 py-4 flex justify-between items-center relative w-full z-50">
      {/* Left Section: Logo & Title */}
      <div className="flex items-center space-x-3">
        <span className="text-2xl">🌿</span>
        <h1 className="text-xl font-bold tracking-wide hidden sm:block">Eco-Health Track</h1>
      </div>

      {/* Right Section: Interactive Health Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 transition px-4 py-2 rounded-lg font-medium shadow-sm focus:outline-none"
        >
          <span>👤</span>
          <span>{profile.name}</span>
          <span className={`transform transition-transform duration-200 text-xs ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
            ▼
          </span>
        </button>

        {/* Dropdown Menu Box */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
            {/* User Quick Info */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <p className="font-semibold text-gray-900 truncate">{profile.name}</p>
              <p className="text-xs text-gray-500 truncate">{profile.email}</p>
            </div>

            {/* Live Health Vitals Grid */}
            <div className="p-4 grid grid-cols-2 gap-3 border-b border-gray-100 bg-white">
              <div className="bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                <p className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Calculated Age</p>
                <p className="text-sm font-semibold text-gray-800">{profile.age} Yrs</p>
              </div>
              <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                <p className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">Blood Group</p>
                <p className="text-sm font-semibold text-gray-800">{profile.bloodGroup}</p>
              </div>
              <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                <p className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Height</p>
                <p className="text-sm font-semibold text-gray-800">{profile.height} cm</p>
              </div>
              <div className="bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                <p className="text-[10px] uppercase font-bold text-rose-700 tracking-wider">Weight</p>
                <p className="text-sm font-semibold text-gray-800">{profile.weight} kg</p>
              </div>
            </div>

            {/* Logout Trigger */}
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                if (onLogout) onLogout();
              }}
              className="w-full text-left px-4 py-3 hover:bg-rose-50 text-rose-600 font-medium transition flex items-center space-x-2"
            >
              <span>🚪</span>
              <span>Logout Account</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
