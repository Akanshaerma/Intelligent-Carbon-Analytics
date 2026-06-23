import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

const API_BASE_URL = 'https://eco-track-3-u27a.onrender.com';

function App() {
  // Global Profile State including calculated age fields
  const [user, setUser] = useState({
    name: "Akansha Verma",
    dob: "2003-06-15",
    age: "23",
    height: "165",
    weight: "58",
    bloodGroup: "B+"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  // Footprint States
  const [travel, setTravel] = useState('');
  const [electricity, setElectricity] = useState('');
  const [food, setFood] = useState('');
  const [logs, setLogs] = useState([]);
  const [currentImpact, setCurrentImpact] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/logs`);
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🧮 DYNAMIC AGE CALCULATOR ALGORITHM
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
    // Sync live calculated age right before saving state
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
    try {
      const response = await axios.post(`${API_BASE_URL}/api/logs`, {
        travel: parseFloat(travel),
        electricity: parseFloat(electricity),
        food: parseFloat(food)
      });
      setCurrentImpact(response.data.currentImpact);
      fetchLogs();
      setTravel(''); setElectricity(''); setFood('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header userProfile={user} onOpenEditModal={() => { setFormData({ ...user }); setIsModalOpen(true); }} />

      <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Welcome Block */}
        <div className="mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Index Dashboard Overview</h2>
          <p className="text-xs text-gray-500 mt-0.5">Welcome back, {user.name}. Click the top left menu button or adjust your dynamic biometrics panel via your avatar icon.</p>
        </div>

        {/* Core Content Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Calculate Footprint</h3>
            <form onSubmit={handleCalculate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-gray-600">Travel Distance (KM)</label>
                <input type="number" value={travel} onChange={e => setTravel(e.target.value)} className="w-full p-2.5 border rounded-lg focus:outline-none focus:border-emerald-500" placeholder="e.g. 80" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-600">Electricity Consumed (kWh)</label>
                <input type="number" value={electricity} onChange={e => setElectricity(e.target.value)} className="w-full p-2.5 border rounded-lg focus:outline-none focus:border-emerald-500" placeholder="e.g. 150" />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-600">Food/Organic waste (KG)</label>
                <input type="number" value={food} onChange={e => setFood(e.target.value)} className="w-full p-2.5 border rounded-lg focus:outline-none focus:border-emerald-500" placeholder="e.g. 12" />
              </div>
              <button type="submit" className="w-full p-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition">Compute Data Stack</button>
            </form>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 self-start mb-2">Live Session Response</h3>
            {currentImpact ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg border border-emerald-100 w-full">
                <p className="text-2xl font-black">{currentImpact} kg</p>
                <p className="text-[11px] text-emerald-600 mt-1">Carbon offset metrics recorded to remote server pipeline successfully.</p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No real-time tracking operations committed this session.</p>
            )}
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-xs">
          <div className="p-4 bg-gray-50/70 border-b font-bold text-gray-700">Cluster Database LedgerLogs</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-500 font-bold uppercase text-[10px] border-b">
                  <th className="p-3">Log Timestamp</th>
                  <th className="p-3">Travel</th>
                  <th className="p-3">Power</th>
                  <th className="p-3">Waste</th>
                  <th className="p-3 text-emerald-600">Total Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                {logs.length > 0 ? logs.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="p-3 text-gray-400">{new Date(item.createdAt || Date.now()).toLocaleDateString('en-GB')}</td>
                    <td className="p-3">{item.travel} km</td>
                    <td className="p-3">{item.electricity} kWh</td>
                    <td className="p-3">{item.food} kg</td>
                    <td className="p-3 font-bold text-emerald-600">{item.totalCarbon || "0.00"} kg</td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="p-6 text-center italic text-gray-400">Empty logs buffer stack.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />

      {/* MODAL CONTROLLER OVERLAY FOR HEALTH VITALS SETUP */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border">
            <div className="p-4 bg-emerald-600 text-white font-bold flex justify-between items-center text-sm">
              <span>⚙️ Modulate Personal Profile Vitals</span>
              <button type="button" onClick={() => setIsModalOpen(false)} className="hover:text-gray-200 text-base font-black">✕</button>
            </div>
            
            <form onSubmit={handleProfileUpdateSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-500 mb-1">Full Identity Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">BirthDate (DOB)</label>
                  <input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none" required />
                </div>
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">Blood Group</label>
                  <select value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full p-2 border rounded-lg bg-white focus:outline-none">
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">Height Size (cm)</label>
                  <input type="number" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none" required />
                </div>
                <div>
                  <label className="block font-semibold text-gray-500 mb-1">Weight Mass (kg)</label>
                  <input type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none" required />
                </div>
              </div>
              <div className="pt-2 flex space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/2 p-2 border text-gray-400 font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="w-1/2 p-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700">Save Setup</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
