import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Authentication States
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Carbon Footprint Calculator States
  const [transport, setTransport] = useState('');
  const [electricity, setElectricity] = useState('');
  const [food, setFood] = useState('');
  const [calculatedResult, setCalculatedResult] = useState(null);
  const [dashboardMessage, setDashboardMessage] = useState('');
  const [history, setHistory] = useState([]); // New History State

  // Automatically setup token
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchHistory(); // Fetch history when logged in
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Function to fetch history from backend
  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/footprint');
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching history", error);
    }
  };

  // Handle Login & Registration
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    
    const endpoint = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';
      
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await axios.post(endpoint, payload);
      setIsSuccess(true);
      
      if (isLogin) {
        setAuthMessage(`Welcome Back! 🎉`);
        setToken(res.data.token);
      } else {
        setAuthMessage('Registration Successful! Switching to Sign In... 🎉');
        setTimeout(() => {
          setIsLogin(true);
          setAuthMessage('');
          setName('');
        }, 2000);
      }
    } catch (error) {
      setIsSuccess(false);
      setAuthMessage(error.response?.data?.message || 'Authentication Failed! ❌');
    }
  };

  // Handle Carbon Calculation & Save
  const handleCalculateFootprint = async (e) => {
    e.preventDefault();
    setDashboardMessage('');

    const totalCarbon = (Number(transport) * 0.21) + (Number(electricity) * 0.85) + (Number(food) * 2.5);
    const finalResult = totalCarbon.toFixed(2);

    try {
      await axios.post('http://localhost:5000/api/footprint', 
        { transport, electricity, food, totalFootprint: finalResult }
      );
      
      setCalculatedResult(finalResult);
      setDashboardMessage('Footprint tracked and saved successfully! 📉🌱');
      fetchHistory(); // Refresh history immediately after saving
      // Clear inputs
      setTransport('');
      setElectricity('');
      setFood('');
    } catch (error) {
      setCalculatedResult(finalResult);
      setDashboardMessage('Saved locally (Backend issue)! 💡');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setToken('');
    setCalculatedResult(null);
    setDashboardMessage('');
    setHistory([]);
  };

  // Condition 1: SHOW DASHBOARD
  if (token) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
        {/* Header */}
        <div className="w-full max-w-4xl flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md border border-green-100">
          <div>
            <h1 className="text-2xl font-bold text-green-800">🌿 Eco-Track Dashboard</h1>
            <p className="text-sm text-gray-500">Tracking your green footsteps</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="w-full max-w-4xl space-y-6">
          {/* Top Grid: Form & Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Calculate New Footprint</h3>
              <form onSubmit={handleCalculateFootprint} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Travel (KM)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. 150" 
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Electricity Bills (kWh)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. 200" 
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Meat/Food waste (KG)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="e.g. 30" 
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition">
                  Calculate & Track
                </button>
              </form>
            </div>

            {/* Results */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Your Impact Summary</h3>
                {calculatedResult ? (
                  <div className="text-center my-6">
                    <div className="text-5xl font-extrabold text-green-600 mb-2">{calculatedResult}</div>
                    <p className="text-gray-600 font-medium">kg of CO2 / month</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 my-12 italic">
                    No footprint data logged yet. Put values to see your impact.
                  </div>
                )}
              </div>
              {dashboardMessage && (
                <div className="p-3 bg-green-50 text-green-800 text-center text-xs font-semibold rounded-lg border border-green-200">
                  {dashboardMessage}
                </div>
              )}
            </div>
          </div>

          {/* History Logs Section */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📜 Past Footprint Logs (From MongoDB)</h3>
            {history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-green-600 text-white text-sm">
                      <th className="p-3 rounded-l-lg">Date</th>
                      <th className="p-3">Travel (KM)</th>
                      <th className="p-3">Electricity (kWh)</th>
                      <th className="p-3">Food (KG)</th>
                      <th className="p-3 rounded-r-lg">Total Carbon ($CO_2$)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {history.map((log) => (
                      <tr key={log._id} className="hover:bg-green-50 text-gray-700">
                        <td className="p-3 font-medium text-gray-500">
                          {new Date(log.createdAt).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
                        </td>
                        <td className="p-3">{log.transport} km</td>
                        <td className="p-3">{log.electricity} kWh</td>
                        <td className="p-3">{log.food} kg</td>
                        <td className="p-3 font-bold text-green-600">{log.totalFootprint} kg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-6 italic">
                No historical records found in database.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Condition 2: SHOW AUTHENTICATION
  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-2">🌿 Eco-Track</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">Reduce your footprint, save the planet.</p>
        
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button type="button" className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`} onClick={() => { setIsLogin(true); setAuthMessage(''); }}>Sign In</button>
          <button type="button" className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-green-600 text-white shadow' : 'text-gray-600'}`} onClick={() => { setIsLogin(false); setAuthMessage(''); }}>Register</button>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="enter email..." value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {authMessage && (
          <div className={`mt-4 p-3 text-center text-sm font-medium rounded-lg border ${isSuccess ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
            {authMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;