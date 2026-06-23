import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://eco-track-3-u27a.onrender.com';

// ==========================================
// 1. DYNAMIC NAVIGATION HEADER
// ==========================================
const LocalHeader = ({ currentTab, setCurrentTab, userProfile, onOpenEditModal, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-emerald-700 text-white shadow-lg px-6 py-4 flex flex-col sm:flex-row justify-between items-center relative z-40 border-b border-emerald-800 gap-4">
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setCurrentTab('landing')}>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚙️</span>
            <span className="font-extrabold tracking-wider text-xl uppercase text-emerald-100">Eco-Informatics Core</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase">Distributed Multi-View Suite</span>
        </div>
      </div>

      {/* APP PAGES TABS */}
      <nav className="flex space-x-2 bg-emerald-800/60 p-1.5 rounded-xl border border-emerald-600/30 text-xs font-mono font-bold">
        <button onClick={() => setCurrentTab('landing')} className={`px-4 py-2 rounded-lg transition ${currentTab === 'landing' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-200 hover:text-white'}`}>Home Portal</button>
        <button onClick={() => setCurrentTab('dashboard')} className={`px-4 py-2 rounded-lg transition ${currentTab === 'dashboard' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-200 hover:text-white'}`}>Workspace Dashboard</button>
        <button onClick={() => setCurrentTab('ledger')} className={`px-4 py-2 rounded-lg transition ${currentTab === 'ledger' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-200 hover:text-white'}`}>Database Archives</button>
      </nav>

      <div className="flex items-center space-x-3 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 transition px-4 py-2 rounded-xl font-bold border border-emerald-600 shadow-md text-sm"
        >
          <span className="text-emerald-400">📊</span>
          <span>{userProfile.name}</span>
          <span className="text-[10px] text-emerald-400">▼</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 mt-1 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            <div className="p-4 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">Active Clinical Biometrics</div>
            <div className="p-4 grid grid-cols-2 gap-3 bg-white text-xs font-mono">
              <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-gray-400 block uppercase text-[9px]">Age</span>
                <span className="font-bold text-emerald-800 text-sm">{userProfile.age || '21'} Yrs</span>
              </div>
              <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                <span className="text-gray-400 block uppercase text-[9px]">Blood</span>
                <span className="font-bold text-blue-800 text-sm">{userProfile.bloodGroup || 'B+'}</span>
              </div>
              <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                <span className="text-gray-400 block uppercase text-[9px]">Stature</span>
                <span className="font-bold text-amber-800 text-sm">{userProfile.height || '152.4'} cm</span>
              </div>
              <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <span className="text-gray-400 block uppercase text-[9px]">Mass</span>
                <span className="font-bold text-rose-800 text-sm">{userProfile.weight || '40'} kg</span>
              </div>
            </div>
            <button
              onClick={() => { setIsDropdownOpen(false); onOpenEditModal(); }}
              className="w-full text-left px-5 py-3 bg-gray-50 hover:bg-emerald-50 text-emerald-700 font-bold text-xs border-t border-gray-100 flex items-center space-x-2"
            >
              <span>⚙️</span>
              <span>Modify Clinical Parameters</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full text-left px-5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border-t border-rose-200 flex items-center space-x-2"
            >
              <span>🚪</span>
              <span>Terminate Session (Logout)</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const LocalFooter = () => (
  <footer className="w-full bg-gray-950 text-gray-500 py-6 px-6 text-xs border-t border-gray-900 font-mono text-center mt-auto">
    <p className="font-bold text-gray-400 tracking-wide">🔬 Industrial Full-Stack Sustainability Analytics Framework v6.0.0</p>
    <p className="text-gray-600 text-[10px] mt-1">Universal Access Core Registered. © 2026.</p>
  </footer>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  
  // Form State Streams
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [regName, setRegName] = useState('');

  const [currentTab, setCurrentTab] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [filterThreshold, setFilterThreshold] = useState('0');

  // Background defaults saved safely
  const [user, setUser] = useState({
    name: "User Terminal Node", email: "user@ecotrack.com", dob: "2005-08-20", age: "21", height: "152.4", weight: "40", bloodGroup: "B+"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const [travel, setTravel] = useState('');
  const [electricity, setElectricity] = useState('');
  const [food, setFood] = useState('');
  
  const [logs, setLogs] = useState([]);
  const [currentImpact, setCurrentImpact] = useState(null);

  const [predictiveForecast, setPredictiveForecast] = useState("0.00");
  const [correlationIndex, setCorrelationIndex] = useState("0.00");
  const [clinicalRiskAssessment, setClinicalRiskAssessment] = useState({ status: "Syncing", color: "text-blue-600 bg-blue-50", desc: "Initializing..." });

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      calculateAdvancedResearchMetrics();
    }
  }, [logs, user, isAuthenticated]);

  // Handle modern browser autofill backgrounds override
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px #020617 inset !important;
        -webkit-text-fill-color: #f1f5f9 !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (authEmail.trim().length > 3 && authPassword.length >= 4) {
      const extractedName = authEmail.split('@')[0];
      const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
      
      setUser(prev => ({
        ...prev,
        name: formattedName || "Active Terminal Node",
        email: authEmail.trim()
      }));
      setIsAuthenticated(true);
      setCurrentTab('landing');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !regName) return;

    // Standard baseline registration architecture setup
    setUser({
      name: regName,
      email: authEmail.trim(),
      dob: "2005-08-20",
      age: "21",
      height: "152.4",
      weight: "40",
      bloodGroup: "B+"
    });

    alert("Account created successfully! Please Sign In to verify credentials.");
    setAuthMode('login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthEmail('');
    setAuthPassword('');
    setRegName('');
    setAuthMode('login');
    setCurrentTab('landing');
  };

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/logs`);
      if (response.data && response.data.length > 0) {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLogs(sorted
