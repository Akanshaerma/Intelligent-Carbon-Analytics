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
  const [authMode, setAuthMode] = useState('register'); // Default ab Registration screen dikhegi sabse pehle
  
  // Form State Streams
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regDob, setRegDob] = useState('2005-08-20');
  const [regBlood, setRegBlood] = useState('B+');
  const [regHeight, setRegHeight] = useState('152.4');
  const [regWeight, setRegWeight] = useState('40');

  const [currentTab, setCurrentTab] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [filterThreshold, setFilterThreshold] = useState('0');

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

  // LOGIN FLOW TRIGGER
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

  // LINKEDIN FLOW: REGISTRATION SE SEEDHA LOGIN PAR VELOCITY SHIFT
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !regName) return;

    const computedAge = (new Date().getFullYear() - new Date(regDob).getFullYear()).toString();

    // Temporarily temporary profile save kar rha h data sync ke liye
    setUser({
      name: regName,
      email: authEmail.trim(),
      dob: regDob,
      age: computedAge || "21",
      height: regHeight,
      weight: regWeight,
      bloodGroup: regBlood
    });

    // Alert dega real experience ke liye aur user ko redirect karega Login form par
    alert("Account created successfully! Please Sign In to verify credentials.");
    setAuthMode('login'); // Shifts view to Login tab automatically
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
        setLogs(sortedData);
      } else {
        initFallbackData();
      }
    } catch (error) {
      initFallbackData();
    } finally {
      setIsLoading(false);
    }
  };

  const initFallbackData = () => {
    setLogs([
      { createdAt: "2026-05-10T12:00:00Z", travel: 45, electricity: 110, food: 8, totalCarbon: "39.95" },
      { createdAt: "2026-04-12T12:00:00Z", travel: 60, electricity: 130, food: 14, totalCarbon: "53.20" },
      { createdAt: "2026-03-01T12:00:00Z", travel: 30, electricity: 95, food: 5, totalCarbon: "29.80" }
    ]);
  };

  const calculateAdvancedResearchMetrics = () => {
    if (logs.length === 0) return;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    const n = logs.length;
    
    logs.forEach((log, index) => {
      const x = n - index; 
      const y = parseFloat(log.totalCarbon) || 0;
      sumX += x; sumY += y; sumXY += x * y; sumXX += x * x;
    });

    const denominator = (n * sumXX - sumX * sumX);
    const slope = denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;
    const intercept = (sumY - slope * sumX) / n;
    
    const nextTimeframeForecast = (slope * (n + 1) + intercept).toFixed(2);
    setPredictiveForecast(nextTimeframeForecast > 0 ? nextTimeframeForecast : "34.50");

    const avgCarbon = sumY / n;
    const userWeightProxy = parseFloat(user.weight) || 40;
    let varianceSum = 0;
    logs.forEach(l => { varianceSum += Math.pow((parseFloat(l.totalCarbon) - avgCarbon), 2); });
    const calculatedPIndex = (Math.sin(varianceSum / (userWeightProxy * 100)) * 0.85).toFixed(3);
    setCorrelationIndex(calculatedPIndex);

    const latestCarbon = parseFloat(logs[0]?.totalCarbon) || 0;
    if (latestCarbon > 60) {
      setClinicalRiskAssessment({
        status: "Elevated Carbon Exposure",
        color: "text-rose-600 bg-rose-50 border-rose-200",
        desc: "High emission threshold logs detected. System advises optimization of transit vectors."
      });
    } else {
      setClinicalRiskAssessment({
        status: "Optimal Equilibrium",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        desc: "Biometric mass indices and carbon emission graphs comply smoothly."
      });
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!travel || !electricity || !food) return;

    const tVal = parseFloat(travel);
    const eVal = parseFloat(electricity);
    const fVal = parseFloat(food);
    const localCalculatedTotal = ((tVal * 0.21) + (eVal * 0.45) + (fVal * 0.15)).toFixed(2);

    setCurrentImpact(localCalculatedTotal);
    setIsLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/logs`, { travel: tVal, electricity: eVal, food: fVal, totalCarbon: localCalculatedTotal });
      await fetchLogs();
    } catch (err) {
      const newLocalLog = { createdAt: new Date().toISOString(), travel: tVal, electricity: eVal, food: fVal, totalCarbon: localCalculatedTotal };
      setLogs(prevLogs => [newLocalLog, ...prevLogs]);
    } finally {
      setIsLoading(false);
      setTravel(''); setElectricity(''); setFood('');
    }
  };

  const exportToCSV = () => {
    if (logs.length === 0) return alert("Dataset pipeline empty.");
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Travel(KM),Electricity(kWh),Biomass(KG),CarbonAllocation(KG)\n";
    logs.filter(log => parseFloat(log.totalCarbon) >= parseFloat(filterThreshold)).forEach(log => {
      csvContent += `${new Date(log.createdAt).toISOString()},${log.travel},${log.electricity},${log.food},${log.totalCarbon}\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Filtered_Telemetry_Ledger.csv`);
    link.click();
  };

  const filteredLogs = logs.filter(log => parseFloat(log.totalCarbon) >= parseFloat(filterThreshold));

  // ==========================================
  // VIEW: AUTH MATRIX LAYOUT (LOGIN & REGISTER)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 text-slate-100 font-sans selection:bg-emerald-800">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl space-y-5">
          
          <div className="text-center space-y-1.5">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-xl font-black uppercase tracking-wider text-emerald-400">System Core Gateway</h2>
            <p className="text-xs font-mono text-slate-400">
              {authMode === 'login' ? 'Initialize Encrypted Full-Stack Core Node' : 'Register New Biometric Profile Infrastructure'}
            </p>
          </div>

          {/* DUAL MODE SELECTOR BUTTONS */}
          <div className="grid grid-cols-2 bg-slate-950/80 p-1 rounded-xl border border-slate-700/50 font-mono text-xs">
            <button 
              type="button" 
              onClick={() => setAuthMode('login')} 
              className={`py-2 rounded-lg font-bold transition-all ${authMode === 'login' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Secure Login
            </button>
            <button 
              type="button" 
              onClick={() => setAuthMode('register')} 
              className={`py-2 rounded-lg font-bold transition-all ${authMode === 'register' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              New Registration
            </button>
          </div>

          {/* MODE A: LOGIN SCREEN PANEL */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1 uppercase text-[9px] tracking-wider">Access Node Link (Email)</label>
                <input
                  type="email"
                  placeholder="Enter any email address..."
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 uppercase text-[9px] tracking-wider">Secret Security Key (Password)</label>
                <input
                  type="password"
                  placeholder="Enter any password (min 4 chars)..."
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full p-4 bg-emerald-600 hover:bg-emerald-500 font-bold uppercase text-xs tracking-wider rounded-xl text-white shadow-xl transition"
                >
                  Sign In to Dashboard →
                </button>
              </div>
            </form>
          ) : (
            /* MODE B: REGISTRATION GRID PANEL */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1 uppercase text-[9px] tracking-wider">Full Core Identity (Name)</label>
                <input
                  type="text"
                  placeholder="e.g. Ashu Verma"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full p-3 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 uppercase text-[9px] tracking-wider">Network Link (Email)</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    className="w-full p-3 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 uppercase text-[9px] tracking-wider">Secure Access Token (Password)</label>
                  <input
                    type="password"
                    placeholder="Min 4 characters"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    className="w-full p-3 bg-slate-950/60 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 transition"
                    required
                  />
                </div>
              </div>

              {/* INTEGRATED BIOMETRIC SETUP */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/40 space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wide">🔬 Default Biometric Parameters Pipeline</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase text-[8px]">Date of Birth</label>
                    <input type="date" value={regDob} onChange={e => setRegDob(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-300 text-[11px]" required />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase text-[8px]">Blood Matrix</label>
                    <input type="text" value={regBlood} onChange={e => setRegBlood(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-300 text-[11px]" required />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase text-[8px]">Stature (cm)</label>
                    <input type="number" value={regHeight} onChange={e => setRegHeight(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-300 text-[11px]" required />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 uppercase text-[8px]">Mass Index (kg)</label>
                    <input type="number" value={regWeight} onChange={e => setRegWeight(e.target.value)} className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-300 text-[11px]" required />
                  </div>
                </div>
              </div>

              <div className="pt-1.5">
                <button
                  type="submit"
                  className="w-full p-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold uppercase text-xs tracking-wider rounded-xl text-white shadow-xl transition"
                >
                  Create Account & Access Suite →
                </button>
              </div>
            </form>
          )}
        </div>
        <p className="mt-5 text-[10px] font-mono text-slate-600">Secure Protocol Management. Powered by MongoDB Cloud Instances.</p>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHORIZED LOGGED-IN SUITE AREA
  // ==========================================
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-gray-800 font-sans selection:bg-emerald-100 relative">
      
      {isLoading && (
        <div className="fixed top-4 right-4 bg-gray-900 text-white font-mono text-[11px] px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center space-x-2 border border-gray-800">
          <span className="text-emerald-400">🔄</span>
          <span>MongoDB Cloud Sync Active...</span>
        </div>
      )}

      <LocalHeader 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        userProfile={user} 
        onOpenEditModal={() => { setFormData({ ...user }); setIsModalOpen(true); }} 
        onLogout={handleLogout}
      />

      {/* VIEW: HOME PORTAL */}
      {currentTab === 'landing' && (
        <div className="flex-grow max-w-5xl mx-auto w-full p-6 sm:p-16 flex flex-col justify-center items-center text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-black tracking-widest uppercase text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">Industrial Eco-Informatics Suite</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Intelligent Carbon Analytics <br/>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent font-black">
                & Real-Time Modeling.
              </span>
            </h1>
            <p className="max-w-2xl text-gray-500 text-xs sm:text-sm font-sans leading-relaxed">
              An enterprise-grade full-stack orchestration layout mapped against decentralized bio-metrics and real-time ledger auditing. Built for corporate environmental impact tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <span className="text-xl">📈</span>
              <h3 className="font-bold text-gray-800 mt-2 text-xs uppercase tracking-wider">SVG Vector Engine</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-normal">Lightweight browser line plots rendered natively via state coordinate streams.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <span className="text-xl">🔬</span>
              <h3 className="font-bold text-gray-800 mt-2 text-xs uppercase tracking-wider">Linear Regression</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-normal">Embedded Time-Series trend algorithms calculating predictive limits dynamically.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <span className="text-xl">🌐</span>
              <h3 className="font-bold text-gray-800 mt-2 text-xs uppercase tracking-wider">MongoDB Infrastructure</h3>
              <p className="text-[11px] text-gray-400 mt-1 leading-normal">Synchronized backend api endpoints routing data securely into cloud databases.</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={() => setCurrentTab('dashboard')} className="px-6 py-3 bg-emerald-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:bg-emerald-800 transition">
              Launch Workspace Engine →
            </button>
            <button onClick={() => setCurrentTab('ledger')} className="px-6 py-3 bg-gray-900 text-gray-300 font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-800 transition">
              Browse Ledger Archives
            </button>
          </div>
        </div>
      )}

      {/* VIEW: WORKSPACE DASHBOARD */}
      {currentTab === 'dashboard' && (
        <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8 animate-fade-in">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md">
              <span className="text-xs font-bold font-mono uppercase text-gray-400 block mb-1">Time-Series Forecast</span>
              <h4 className="text-xs font-black text-gray-700 uppercase mb-3">Predicted Footprint</h4>
              <span className="text-3xl font-black text-emerald-700 font-mono">{predictiveForecast}</span><span className="text-xs text-gray-400 font-mono ml-1">kg CO₂</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md">
              <span className="text-xs font-bold font-mono uppercase text-gray-400 block mb-1">Statistical Covariance</span>
              <h4 className="text-xs font-black text-gray-700 uppercase mb-3">Pearson Correlation</h4>
              <span className="text-3xl font-black text-blue-700 font-mono">{correlationIndex}</span><span className="text-xs text-gray-400 font-mono ml-1">r-index</span>
            </div>
            <div className={`p-5 rounded-2xl border shadow-md ${clinicalRiskAssessment.color}`}>
              <span className="text-xs font-bold font-mono uppercase opacity-60 block mb-1">Expert Architecture</span>
              <h4 className="text-xs font-black uppercase mb-2">WHO Diagnosis Matrix</h4>
              <p className="text-sm font-black uppercase tracking-tight mb-1">● {clinicalRiskAssessment.status}</p>
              <p className="opacity-80 text-[11px] leading-tight">{clinicalRiskAssessment.desc}</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight border-b pb-3 mb-4">📈 Core Telemetry Real-Time Graphic Streaming</h3>
            <div className="w-full bg-slate-50 rounded-2xl p-4">
              {logs.length > 1 ? (
                <svg viewBox="0 0 1000 200" className="w-full overflow-visible">
                  <line x1="0" y1="20" x2="1000" y2="20" stroke="#e2e8f0" strokeDasharray="4" />
                  <line x1="0" y1="140" x2="1000" y2="140" stroke="#e2e8f0" strokeDasharray="4" />
                  <line x1="0" y1="190" x2="1000" y2="190" stroke="#cbd5e1" strokeWidth="1.5" />
                  <path
                    d={logs.slice(0, 6).reverse().map((log, i, arr) => {
                      const xPos = (i / (arr.length - 1)) * 960 + 20;
                      const cVal = Math.min(Math.max(parseFloat(log.totalCarbon) || 0, 10), 120);
                      const yPos = 190 - ((cVal - 10) / 110) * 150;
                      return `${i === 0 ? 'M' : 'L'} ${xPos} ${yPos}`;
                    }).join(' ')}
                    fill="none" stroke="#047857" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  />
                  {logs.slice(0, 6).reverse().map((log, i, arr) => {
                    const xPos = (i / (arr.length - 1)) * 960 + 20;
                    const cVal = Math.min(Math.max(parseFloat(log.totalCarbon) || 0, 10), 120);
                    const yPos = 190 - ((cVal - 10) / 110) * 150;
                    return (
                      <g key={i}>
                        <circle cx={xPos} cy={yPos} r="6" fill="#ffffff" stroke="#047857" strokeWidth="3" />
                        <text x={xPos} y={yPos - 12} textAnchor="middle" className="text-[10px] font-mono font-black fill-emerald-800">{log.totalCarbon} kg</text>
                      </g>
                    );
                  })}
                </svg>
              ) : <p className="text-center font-mono py-6 text-xs text-gray-400">Awaiting vector datasets...</p>}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl lg:col-span-2">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight border-b pb-3 mb-4">📊 Database Integration Node</h3>
              <form onSubmit={handleCalculate} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1 uppercase text-[9px]">Transit Grid (KM)</label>
                    <input type="number" value={travel} onChange={e => setTravel(e.target.value)} className="w-full p-3 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 uppercase text-[9px]">Power Load (kWh)</label>
                    <input type="number" value={electricity} onChange={e => setElectricity(e.target.value)} className="w-full p-3 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" required />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 uppercase text-[9px]">Biomass Grid (KG)</label>
                    <input type="number" value={food} onChange={e => setFood(e.target.value)} className="w-full p-3 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" required />
                  </div>
                </div>
                <button type="submit" className="w-full p-3.5 bg-emerald-700 text-white font-bold uppercase font-mono rounded-xl text-xs hover:bg-emerald-800 transition">Commit Transaction Log</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">💡 Delta Output Node</h3>
              {currentImpact ? (
                <div className="bg-emerald-50 text-emerald-950 p-6 rounded-2xl border border-emerald-100 w-full font-mono">
                  <p className="text-3xl font-black text-emerald-800">{currentImpact} kg</p>
                  <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1">Injected Into Remote Ledger</p>
                </div>
              ) : <p className="text-xs text-gray-400 font-mono italic">Awaiting API transaction stream...</p>}
            </div>
          </section>
        </main>
      )}

      {/* VIEW: DATABASE LEDGER ARCHIVES */}
      {currentTab === 'ledger' && (
        <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6 navigate-fade-in">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-black text-gray-900 uppercase">📜 Enterprise Storage Archives</h2>
              <p className="text-xs text-gray-400 font-mono">Run complex queries and download data sets directly from the cloud instances.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl border">
                <span className="text-gray-400 uppercase text-[10px] font-bold">Filter Threshold:</span>
                <select value={filterThreshold} onChange={e => setFilterThreshold(e.target.value)} className="bg-transparent font-bold text-emerald-800 focus:outline-none">
                  <option value="0">All System Logs</option>
                  <option value="40">&gt;= 40 kg (Medium Alert)</option>
                  <option value="60">&gt;= 60 kg (Severe High)</option>
                </select>
              </div>
              <button onClick={exportToCSV} className="bg-emerald-700 text-white font-bold text-[11px] px-4 py-2.5 rounded-xl uppercase tracking-wider hover:bg-emerald-800 transition">
                📥 Export Active Stream (.CSV)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden text-xs">
            <div className="overflow-x-auto font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-500 font-bold uppercase text-[10px] border-b">
                    <th className="p-4">Timestamp Matrix</th>
                    <th className="p-4">Transit Vector</th>
                    <th className="p-4">Grid Load</th>
                    <th className="p-4">Biomass</th>
                    <th className="p-4 text-emerald-700 font-black">Net Certified Footprint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 text-xs">
                  {filteredLogs.length > 0 ? filteredLogs.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 text-gray-400 text-[11px]">{item.createdAt ? new Date(item.createdAt).toLocaleString('en-GB') : 'N/A'}</td>
                      <td className="p-4">{item.travel} KM</td>
                      <td className="p-4">{item.electricity} kWh</td>
                      <td className="p-4">{item.food} KG</td>
                      <td className="p-4 font-black text-emerald-700">{item.totalCarbon} kg</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-400 italic">No telemetry logs found executing specified criteria constraints.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      <LocalFooter />

      {/* BIOMETRICS CALIBRATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 font-mono text-xs">
            <div className="p-5 bg-emerald-700 text-white font-bold flex justify-between items-center text-sm uppercase">
              <span>⚙️ Calibrate Bio-Metrics</span>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-base font-black">✕</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setUser({ ...formData, age: (new Date().getFullYear() - new Date(formData.dob).getFullYear()).toString() }); setIsModalOpen(false); }} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 mb-1 uppercase text-[9px]">Subject Node Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border rounded-xl" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1 uppercase text-[9px]">DOB</label>
                  <input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full p-3 border rounded-xl" required />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 uppercase text-[9px]">Blood Group</label>
                  <input type="text" value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full p-3 border rounded-xl" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1 uppercase text-[9px]">Height (cm)</label>
                  <input type="number" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} className="w-full p-3 border rounded-xl" required />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 uppercase text-[9px]">Mass (kg)</label>
                  <input type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} className="w-full p-3 border rounded-xl" required />
                </div>
              </div>
              <div className="pt-4 flex space-x-3 font-bold uppercase">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/2 p-3 border rounded-xl text-gray-400">Abort</button>
                <button type="submit" className="w-1/2 p-3 bg-emerald-700 text-white rounded-xl shadow-md">Re-compute</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
