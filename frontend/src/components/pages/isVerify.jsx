import axios from 'axios'
import React, { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
const isVerify = () => {
  const [code, setCode] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const params = useParams();
  const Navigate = useNavigate();
   
   
  const handleSubmit = async (e) => {
    setLoading(true);
    setMessage('');
    try {
      // Replace with your API endpoint
      const res = await axios.post(`${import.meta.env.VITE_backendURL}users/verify`, {token:code} ).then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', data.token)
                Navigate("/shop")
            }
        })
      setMessage('Email verified successfully!');
    } catch (err) {
      console.log(err)
      setMessage(err.response?.data?.message || 'Verification failed.');
      setCode("");
    }
    setLoading(false);
    
  };
let token = params.id.split("=")[1];
useEffect(() => {
    setCode(token)
  const verify = async () => {
    await handleSubmit();
  };
  verify();
   },[token])
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-black">
            Email Verification
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white text-lg tracking-wider placeholder-white"
              placeholder="Enter your code"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white text-lg transition-all duration-300 transform hover:scale-[1.02] ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-black'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${
            message.toLowerCase().includes('success')
              ? 'bg-green-900/30 text-green-400 border border-green-800'
              : 'bg-red-900/30 text-red-400 border border-red-800'
          }`}>
            <p className="text-center font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default isVerify