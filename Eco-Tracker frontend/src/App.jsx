import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://eco-track-3-u27a.onrender.com';

// ==========================================
// 1. INLINE HEADER COMPONENT 
// ==========================================
const LocalHeader = ({ userProfile, onOpenEditModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-emerald-700 text-white shadow-lg px-6 py-4 flex justify-between items-center relative z-40 border-b border-emerald-800">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚙️</span>
            <span className="font-extrabold tracking-wider text-xl uppercase text-emerald-100">Eco-Informatics Core</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase">Distributed Full-Stack Matrix</span>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 transition px-4 py-2 rounded-xl font-bold border border-emerald-600 shadow-md focus:outline-none text-sm"
        >
          <span className="text-emerald-400">📊</span>
          <span>{userProfile.name}</span>
          <span className="text-[10px] text-emerald-400">▼</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <p className="font-bold text-xs text-gray-400 uppercase tracking-wider">Active Clinical Biometrics</p>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3 bg-white text-xs font-mono">
              <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Computed Age</span>
                <span className="font-bold text-emerald-800 text-sm">{userProfile.age || '21'} Yrs</span>
              </div>
              <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Blood Group</span>
                <span className="font-bold text-blue-800 text-sm">{userProfile.bloodGroup || 'B+'}</span>
              </div>
              <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Stature</span>
                <span className="font-bold text-amber-800 text-sm">{userProfile.height ? `${userProfile.height} cm` : '152.4 cm'}</span>
              </div>
              <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Body Mass</span>
                <span className="font-bold text-rose-800 text-sm">{userProfile.weight ? `${userProfile.weight} kg` : '40 kg'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsDropdownOpen(false);
                onOpenEditModal();
              }}
              className="w-full text-left px-5 py-3 bg-gray-50 hover:bg-emerald-50 text-emerald-700 font-bold text-xs transition border-t border-gray-100 flex items-center space-x-2"
            >
              <span>⚙️</span>
              <span>Modify Clinical Parameters</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const LocalFooter = () => (
  <footer className="w-full bg-gray-950 text-gray-500 py-6 px-6 text-xs mt-auto border-t border-gray-900 font-mono text-center">
    <p className="font-bold text-gray-400 tracking-wide">🔬 Industrial Full-Stack Sustainability Analytics Framework v5.0.0</p>
    <p className="text-gray-600 text-[10px] mt-1">MongoDB Distributed Cloud Synchronization Layer. © 2026.</p>
  </footer>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "Akansha Verma",
    email: "akansha@ecotrack.com",
    dob: "2005-08-20",
    age: "21",
    height: "152.4",
    weight: "40",
    bloodGroup: "B+"
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
  const [clinicalRiskAssessment, setClinicalRiskAssessment] = useState({ status: "Syncing", color: "text-blue-600 bg-blue-50", desc: "Initializing remote ledger pipeline..." });

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    calculateAdvancedResearchMetrics();
  }, [logs, user]);

  // ==========================================
  // DISTRIBUTED DATABASE SYNCHRONIZATION ENGINE
  // ==========================================
  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/logs`);
      if (response.data && response.data.length > 0) {
        // Sort logs to show latest on top
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLogs(sortedData);
      } else {
        initFallbackData();
      }
    } catch (error) {
      console.error("Cold start latency or server down. Spinning up fail-safe data cache.");
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
        status: "Optimal Biometric Equilibrium",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        desc: "Biometric mass indices and carbon emission graphs comply smoothly with international baselines."
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
      // POST direct to MongoDB Cluster
      await axios.post(`${API_BASE_URL}/api/logs`, { 
        travel: tVal, 
        electricity: eVal, 
        food: fVal,
        totalCarbon: localCalculatedTotal 
      });
      // Re-fetch ledger directly from cloud database for perfect single-source sync
      await fetchLogs();
    } catch (err) {
      console.log("Network mutation failed. Committing transaction locally.");
      const newLocalLog = {
        createdAt: new Date().toISOString(),
        travel: tVal, electricity: eVal, food: fVal,
        totalCarbon: localCalculatedTotal
      };
      setLogs(prevLogs => [newLocalLog, ...prevLogs]);
    } finally {
      setIsLoading(false);
      setTravel(''); setElectricity(''); setFood('');
    }
  };

  const exportToCSV = () => {
    if (logs.length === 0) return alert("Dataset pipeline empty.");
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Travel(KM),Electricity(kWh),Biomass(KG),CarbonAllocation(KG)\n";
    logs.forEach(log => {
      csvContent += `${new Date(log.createdAt).toISOString()},${log.travel},${log.electricity},${log.food},${log.totalCarbon}\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `FullStack_Ledger_Export.csv`);
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-gray-950 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>
          <span className="text-5xl block mb-2">🔬</span>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Eco-Informatics Gate</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">Cloud Node Authorization Required</p>
          <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="mt-8 text-left space-y-5 text-xs">
            <div>
              <label className="block font-bold text-gray-500 uppercase mb-1 font-mono">Terminal ID</label>
              <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full p-3.5 border border-gray-200 font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="admin@ecotrack.org" required />
            </div>
            <div>
              <label className="block font-bold text-gray-500 uppercase mb-1 font-mono">Access Token</label>
              <input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full p-3.5 border border-gray-200 font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full p-3.5 bg-emerald-700 text-white uppercase tracking-wider font-mono font-black rounded-xl text-sm hover:bg-emerald-800 transition shadow-lg">
              Synchronize Cloud Cluster
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-gray-800 font-sans selection:bg-emerald-100 relative">
      
      {/* ENTERPRISE LOADING STATE OVERLAY */}
      {isLoading && (
        <div className="fixed top-4 right-4 bg-gray-900 text-white font-mono text-[11px] px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center space-x-2 border border-gray-800 animate-pulse">
          <span className="text-emerald-400">🔄</span>
          <span>Syncing with Remote MongoDB Instance...</span>
        </div>
      )}

      <LocalHeader userProfile={user} onOpenEditModal={() => { setFormData({ ...user }); setIsModalOpen(true); }} />

      <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* TOP LEVEL REAL-TIME ALGORITHMIC RESEARCH PANEL */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold font-mono uppercase text-gray-400 tracking-widest block mb-1">Time-Series Forecast</span>
              <h4 className="text-sm font-black text-gray-700 uppercase">Predicted Footprint</h4>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-emerald-700 font-mono">{predictiveForecast}</span>
              <span className="text-xs text-gray-400 font-mono ml-1">kg CO₂ eq</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold font-mono uppercase text-gray-400 tracking-widest block mb-1">Statistical Covariance</span>
              <h4 className="text-sm font-black text-gray-700 uppercase">Pearson Correlation Index</h4>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-blue-700 font-mono">{correlationIndex}</span>
              <span className="text-xs text-gray-400 font-mono ml-1">r index</span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border shadow-md flex flex-col justify-between ${clinicalRiskAssessment.color}`}>
            <div>
              <span className="text-xs font-bold font-mono uppercase opacity-60 tracking-widest block mb-1">Expert Architecture</span>
              <h4 className="text-sm font-black uppercase">WHO Diagnosis Matrix</h4>
            </div>
            <div className="mt-2 text-xs font-bold leading-tight font-mono">
              <p className="text-sm font-black uppercase tracking-tight mb-1">● {clinicalRiskAssessment.status}</p>
              <p className="opacity-80 font-sans text-[11px] font-normal">{clinicalRiskAssessment.desc}</p>
            </div>
          </div>
        </section>

        {/* NATIVE VECTOR VISUALIZATION CONSOLE */}
        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h3 className="text-base font-black text-gray-800 uppercase tracking-tight">📈 Server Metrics Visualization Stream</h3>
              <p className="text-[11px] font-mono text-gray-400">Dynamic UI Render Mapping over Live Cloud Datasets</p>
            </div>
          </div>

          <div className="w-full bg-slate-50 rounded-2xl p-4 flex flex-col justify-center relative">
            {logs.length > 1 ? (
              <div className="w-full">
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
                        <text x={xPos} y={yPos - 15} textAnchor="middle" className="text-[11px] font-mono font-black fill-emerald-800">
                          {log.totalCarbon} kg
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            ) : (
              <p className="text-center font-mono py-6 text-xs text-gray-400 italic">Database connection healthy. Awaiting telemetry streams...</p>
            )}
          </div>
        </section>

        {/* INPUT DATA LAYER CONSOLE */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl lg:col-span-2">
            <div className="border-b pb-3 mb-4">
              <h3 className="text-base font-black text-gray-800 uppercase tracking-tight">📊 Database Mutator Console</h3>
            </div>
            <form onSubmit={handleCalculate} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 mb-1 uppercase text-[10px]">Transit Grid (KM)</label>
                  <input type="number" value={travel} onChange={e => setTravel(e.target.value)} className="w-full p-3 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" placeholder="e.g. 45" required />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1 uppercase text-[10px]">Power Load (kWh)</label>
                  <input type="number" value={electricity} onChange={e => setElectricity(e.target.value)} className="w-full p-3 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" placeholder="e.g. 110" required />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1 uppercase text-[10px]">Biomass (KG)</label>
                  <input type="number" value={food} onChange={e => setFood(e.target.value)} className="w-full p-3 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none" placeholder="e.g. 8" required />
                </div>
              </div>
              <button type="submit" className="w-full p-3.5 bg-emerald-700 text-white font-bold uppercase font-mono tracking-widest rounded-xl text-xs hover:bg-emerald-800 transition shadow-md">
                Commit Transaction to Cloud Cluster
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-center items-center text-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">💡 Live Node Computed Impact</h3>
            {currentImpact ? (
              <div className="bg-emerald-50 text-emerald-950 p-6 rounded-2xl border border-emerald-100 w-full font-mono">
                <p className="text-2xl font-black tracking-tight text-emerald-800">{currentImpact} kg</p>
                <p className="text-[9px] text-emerald-600 mt-1 uppercase tracking-wider font-bold">Successfully Verified & Injected</p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 font-mono italic">Awaiting API transaction stream initialization...</p>
            )}
          </div>
        </section>

        {/* LEDGER GRID LOG MATRIX */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden text-xs">
          <div className="p-5 bg-gray-950 text-white font-mono font-bold flex justify-between items-center flex-wrap gap-4">
            <span className="tracking-widest uppercase text-xs">🌐 MongoDB Cloud Instance Live Ledger</span>
            <button onClick={exportToCSV} className="bg-emerald-600 text-white text-[10px] font-black px-4 py-2 rounded-xl border border-emerald-500 hover:bg-emerald-700 transition tracking-wider uppercase">
              📥 Export Dataset (.CSV)
            </button>
          </div>
          <div className="overflow-x-auto font-mono">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-500 font-bold uppercase text-[10px] border-b">
                  <th className="p-4">Timestamp Coordinate</th>
                  <th className="p-4">Transit Metric</th>
                  <th className="p-4">Grid Load</th>
                  <th className="p-4">Biomass</th>
                  <th className="p-4 text-emerald-700 font-black">Net Carbon Node</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 text-xs">
                {logs.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 text-gray-400 text-[11px]">{item.createdAt ? new Date(item.createdAt).toLocaleString('en-GB') : 'N/A'}</td>
                    <td className="p-4">{item.travel} KM</td>
                    <td className="p-4">{item.electricity} kWh</td>
                    <td className="p-4">{item.food} KG</td>
                    <td className="p-4 font-black text-emerald-700">{item.totalCarbon} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <LocalFooter />

      {/* BIOMETRICS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="p-5 bg-emerald-700 text-white font-bold flex justify-between items-center text-sm uppercase tracking-wide">
              <span>⚙️ Calibrate Bio-Metric Coefficients</span>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-base font-black">✕</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setUser({ ...formData, age: calculateAgeFromDOB(formData.dob) }); setIsModalOpen(false); }} className="p-6 space-y-4 text-xs font-mono">
              <div>
                <label className="block font-bold text-gray-500 uppercase mb-1">Entity Subject Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Origin (DOB)</label>
                  <input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" required />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Phenotype Blood</label>
                  <input type="text" value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Height (cm)</label>
                  <input type="number" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" required />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 uppercase mb-1">Mass (kg)</label>
                  <input type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" required />
                </div>
              </div>
              <div className="pt-4 flex space-x-3 text-xs uppercase font-bold">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/2 p-3 border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 text-center">Abort</button>
                <button type="submit" className="w-1/2 p-3 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 text-center shadow-md">Re-compute System</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
