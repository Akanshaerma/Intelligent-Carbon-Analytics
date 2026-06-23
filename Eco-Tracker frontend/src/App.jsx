import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://eco-track-3-u27a.onrender.com';

// ==========================================
// 1. INLINE HEADER COMPONENT 
// ==========================================
const LocalHeader = ({ userProfile, onOpenEditModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-emerald-600 text-white shadow-md px-4 py-3 flex justify-between items-center relative z-40">
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => alert("Index Menu Sidebar Triggered!")} 
          className="p-2 hover:bg-emerald-700 rounded-lg transition focus:outline-none"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xl">🌿</span>
          <span className="font-bold tracking-wide text-lg">Eco-Health Portal</span>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 transition px-3 py-1.5 rounded-lg font-medium shadow-inner focus:outline-none text-sm"
        >
          <span>👤 {userProfile.name} ▼</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <p className="font-semibold text-xs text-gray-400 uppercase tracking-wider">Active Health Vitals</p>
            </div>

            <div className="p-3 grid grid-cols-2 gap-2 bg-white text-xs">
              <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Calculated Age</span>
                <span className="font-semibold text-gray-800">{userProfile.age || 'N/A'} Yrs</span>
              </div>
              <div className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Blood Group</span>
                <span className="font-semibold text-gray-800">{userProfile.bloodGroup || 'N/A'}</span>
              </div>
              <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Height</span>
                <span className="font-semibold text-gray-800">{userProfile.height ? `${userProfile.height} cm` : 'N/A'}</span>
              </div>
              <div className="bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                <span className="text-gray-400 block font-bold uppercase text-[9px]">Weight</span>
                <span className="font-semibold text-gray-800">{userProfile.weight ? `${userProfile.weight} kg` : 'N/A'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsDropdownOpen(false);
                onOpenEditModal();
              }}
              className="w-full text-left px-4 py-2.5 bg-gray-50 hover:bg-emerald-50 text-emerald-600 font-semibold text-xs transition border-t border-gray-100 flex items-center space-x-2"
            >
              <span>⚙️</span>
              <span>Edit Health Settings</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

// ==========================================
// 2. INLINE FOOTER COMPONENT
// ==========================================
const LocalFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-4 px-4 text-xs mt-auto border-t border-gray-800 text-center">
      <p className="font-semibold text-gray-300">🌿 Eco-Track Analytics Index</p>
      <p className="text-gray-500 text-[11px] mt-0.5">© 2026 Carbon and Biometrics sync matrix layer.</p>
    </footer>
  );
};

// ==========================================
// 3. MAIN CORE APPLICATION FUNCTION
// ==========================================
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [user, setUser] = useState({
    name: "Akansha Verma",
    email: "akansha@ecotrack.com",
    dob: "2003-06-15",
    age: "23",
    height: "165",
    weight: "58",
    bloodGroup: "B+"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const [travel, setTravel] = useState('');
  const [electricity, setElectricity] = useState('');
  const [food, setFood] = useState('');
  const [logs, setLogs] = useState([]);
  const [currentImpact, setCurrentImpact] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLogs();
    }
  }, [isAuthenticated]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/logs`);
      if (response.data && response.data.length > 0) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching database logs:", error);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (authEmail && authPassword) {
      setUser(prev => ({ ...prev, email: authEmail }));
      setIsAuthenticated(true);
    }
  };

  const calculateAgeFromDOB = (birthDateString) => {
    if (!birthDateString) return "0";
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let computedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      computedAge--;
    }
    return computedAge >= 0 ? computedAge.toString() : "0";
  };

  const handleProfileUpdateSubmit = (e) => {
    e.preventDefault();
    const exactCalculatedAge = calculateAgeFromDOB(formData.dob);
    setUser({
      ...formData,
      age: exactCalculatedAge
    });
    setIsModalOpen(false);
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!travel || !electricity || !food) return;

    const tVal = parseFloat(travel);
    const eVal = parseFloat(electricity);
    const fVal = parseFloat(food);

    // Standard local fallback formula calculation mechanism
    // (Travel * 0.21) + (Electricity * 0.45) + (Food * 0.15)
    const localCalculatedTotal = ((tVal * 0.21) + (eVal * 0.45) + (fVal * 0.15)).toFixed(2);

    // Update screen UI state immediately so user sees calculation instantly
    setCurrentImpact(localCalculatedTotal);

    // Append custom row locally to grid history array
    const newLocalLog = {
      createdAt: new Date().toISOString(),
      travel: tVal,
      electricity: eVal,
      food: fVal,
      totalCarbon: localCalculatedTotal
    };
    setLogs(prevLogs => [newLocalLog, ...prevLogs]);

    // Send asynchronously to external MongoDB network cluster in backend
    try {
      await axios.post(`${API_BASE_URL}/api/logs`, {
        travel: tVal,
        electricity: eVal,
        food: fVal
      });
    } catch (err) {
      console.log("Database offline fallback initiated. Rendered locally successfully.");
    }

    // Reset fields
    setTravel(''); 
    setElectricity(''); 
    setFood('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-emerald-50/30 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-gray-100 text-center">
          <span className="text-4xl">🌿</span>
          <h1 className="text-2xl font-extrabold text-emerald-800 mt-2">Eco-Track</h1>
          <p className="text-xs text-gray-400 mt-1">Reduce your footprint, save the planet.</p>
          
          <div className="flex bg-gray-100 p-1 rounded-xl mt-6 text-xs font-bold">
            <button className="w-1/2 py-2 bg-emerald-600 text-white rounded-lg shadow-sm">Sign In</button>
            <button type="button" className="w-1/2 py-2 text-gray-500">Register</button>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-4 text-left space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-600 mb-1">Email Address</label>
              <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500" required />
            </div>
            <div>
              <label className="block font-bold text-gray-600 mb-1">Password</label>
              <input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500" required />
            </div>
            <button type="submit" className="w-full p-3 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 transition shadow-md">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <LocalHeader userProfile={user} onOpenEditModal={() => { setFormData({ ...user }); setIsModalOpen(true); }} />

      <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Eco-Track Dashboard Overview</h2>
          <p className="text-xs text-gray-500 mt-0.5">Welcome back, {user.name}. Use the components layer dynamically.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">📊 Calculate New Footprint</h3>
            <form onSubmit={handleCalculate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-gray-600">Travel Distance (KM)</label>
                <input 
                  type="number" 
                  value={travel} 
                  onChange={e => setTravel(e.target.value)} 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" 
                  placeholder="e.g. 80" 
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-600">Electricity Consumed (kWh)</label>
                <input 
                  type="number" 
                  value={electricity} 
                  onChange={e => setElectricity(e.target.value)} 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" 
                  placeholder="e.g. 150" 
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-600">Food/Organic waste (KG)</label>
                <input 
                  type="number" 
                  value={food} 
                  onChange={e => setFood(e.target.value)} 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none" 
                  placeholder="e.g. 12" 
                  required
                />
              </div>
              <button type="submit" className="w-full p-3 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 transition">
                Calculate & Track
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 self-start mb-2">💡 Your Impact Summary</h3>
            {currentImpact ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 w-full animate-fade-in">
                <span className="text-3xl">🌱</span>
                <p className="text-2xl font-black mt-2">{currentImpact} kg</p>
                <p className="text-[10px] text-emerald-600 mt-1">Carbon matrix updated successfully!</p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No footprint data logged yet. Fill numbers and click calculate.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-xs">
          <div className="p-4 bg-gray-50/70 border-b font-bold text-gray-700">📜 Past Footprint Logs (History Tracker)</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-500 font-bold uppercase text-[10px] border-b">
                  <th className="p-4">Date</th>
                  <th className="p-4">Travel</th>
                  <th className="p-4">Power</th>
                  <th className="p-4">Waste</th>
                  <th className="p-4 text-emerald-600">Total Carbon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {logs.length > 0 ? logs.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="p-4 text-gray-400">{new Date(item.createdAt || Date.now()).toLocaleDateString('en-GB')}</td>
                    <td className="p-4">{item.travel} km</td>
                    <td className="p-4">{item.electricity} kWh</td>
                    <td className="p-4">{item.food} kg</td>
                    <td className="p-4 font-bold text-emerald-600">{item.totalCarbon || "0.00"} kg</td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="p-6 text-center italic text-gray-400">No logs saved.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <LocalFooter />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100">
            <div className="p-4 bg-emerald-600 text-white font-bold flex justify-between items-center text-sm">
              <span>⚙️ Update Health Vitals</span>
              <button type="button" onClick={() => setIsModalOpen(false)} className="hover:text-gray-200 text-base font-black">✕</button>
            </div>
            
            <form onSubmit={handleProfileUpdateSubmit} className="p-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-500 mb-1">Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">BirthDate (DOB)</label>
                  <input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none" required />
                </div>
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">Blood Group</label>
                  <select value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full p-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none">
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">Height (cm)</label>
                  <input type="number" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none" required />
                </div>
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">Weight (kg)</label>
                  <input type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none" required />
                </div>
              </div>
              <div className="pt-2 flex space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/2 p-2.5 border border-gray-200 text-gray-400 font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
                <button type="submit" className="w-1/2 p-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700">Save Vitals</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
