import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

// 💡 Tumhara live Render backend URL
const API_BASE_URL = 'https://eco-track-3-u27a.onrender.com';

function App() {
  // Authentication & Mock User Profile State for Header
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    name: "Akansha Verma",
    email: "akansha@ecotrack.com",
    age: "23",
    height: "165",
    weight: "58",
    bloodGroup: "B+"
  });

  // Carbon Tracker Inputs State
  const [travel, setTravel] = useState('');
  const [electricity, setElectricity] = useState('');
  const [food, setFood] = useState('');
  const [logs, setLogs] = useState([]);
  const [currentImpact, setCurrentImpact] = useState(null);

  // Fetch Past Logs from MongoDB
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/logs`);
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!travel || !electricity || !food) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      travel: parseFloat(travel),
      electricity: parseFloat(electricity),
      food: parseFloat(food)
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/logs`, payload);
      setCurrentImpact(response.data.currentImpact);
      fetchLogs(); // Refresh historical data table
      
      // Clear inputs
      setTravel('');
      setElectricity('');
      setFood('');
    } catch (error) {
      console.error("Error saving log:", error);
    }
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Handle logout flow here if needed
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. TOP DYNAMIC HEADER WITH USER PROFILE */}
      <Header userProfile={user} onLogout={handleLogout} />

      {/* 2. MAIN CORE LAYOUT CONTENT */}
      <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Top welcome section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back, {user.name}!</h2>
          <p className="text-sm text-gray-500">Track your sustainability metrics and maintain your physical vitals seamlessly.</p>
        </div>

        {/* Form and Impact Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Calculate New Footprint Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              📊 Calculate New Footprint
            </h3>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Monthly Travel (KM)</label>
                <input 
                  type="number" 
                  value={travel} 
                  onChange={(e) => setTravel(e.target.value)} 
                  placeholder="e.g. 150" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Electricity Bills (kWh)</label>
                <input 
                  type="number" 
                  value={electricity} 
                  onChange={(e) => setElectricity(e.target.value)} 
                  placeholder="e.g. 200" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Meat/Food waste (KG)</label>
                <input 
                  type="number" 
                  value={food} 
                  onChange={(e) => setFood(e.target.value)} 
                  placeholder="e.g. 30" 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-3 rounded-xl transition shadow-sm">
                Calculate & Track
              </button>
            </form>
          </div>

          {/* Dynamic Impact Status Summary Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2 self-start">💡 Your Impact Summary</h3>
            {currentImpact ? (
              <div className="w-full bg-emerald-50 border border-emerald-100 p-6 rounded-xl animate-fade-in">
                <span className="text-4xl">🌱</span>
                <h4 className="text-xl font-bold text-emerald-800 mt-2">Emission Computed Successfully!</h4>
                <p className="text-3xl font-extrabold text-gray-800 mt-3">{currentImpact} <span className="text-sm font-normal text-gray-500">kg CO₂</span></p>
                <p className="text-xs text-emerald-600 mt-2">This log has been pushed to your synchronized MongoDB storage layer.</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No footprint data logged yet in this session. Put values to see your instant footprint impact breakdown.
              </p>
            )}
          </div>
        </div>

        {/* Past Footprint Logs Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              📜 Past Footprint Logs (From MongoDB Atlas Cluster)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Date Logged</th>
                  <th className="p-4">Travel (KM)</th>
                  <th className="p-4">Electricity (kWh)</th>
                  <th className="p-4">Food (KG)</th>
                  <th className="p-4 text-emerald-600">Total Carbon (CO₂)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {logs.length > 0 ? logs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-medium text-gray-500">{new Date(log.createdAt || Date.now()).toLocaleDateString('en-GB')}</td>
                    <td className="p-4">{log.travel} km</td>
                    <td className="p-4">{log.electricity} kWh</td>
                    <td className="p-4">{log.food} kg</td>
                    <td className="p-4 font-bold text-emerald-600">{log.totalCarbon || (log.travel*0.2 + log.electricity*0.5 + log.food*2.5).toFixed(2)} kg</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400 italic">No historical logs parsed from cluster database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* 3. STANDALONE ATTACHED FOOTER COMPONENT */}
      <Footer />
    </div>
  );
}

export default App;
