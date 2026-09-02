import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CRM_CREDENTIALS } from '../config/crmAuth';
import { Lock, User, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CrmLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/crm';

  useEffect(() => {
    // If already authenticated, redirect to CRM
    if (sessionStorage.getItem('crm_authenticated') === 'true') {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === CRM_CREDENTIALS.username && password === CRM_CREDENTIALS.password) {
      sessionStorage.setItem('crm_authenticated', 'true');
      toast.success('Login Successful');
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password');
      toast.error('Authentication Failed');
    }
  };

  return (
    <div className="min-h-screen bg-qx-bg text-qx-text flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-qx-text">
            QEVRIX <span className="text-qx-primary">CRM</span>
          </h2>
          <p className="mt-2 text-sm text-qx-textSecondary">
            Authorized Personnel Only
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-qx-surface border border-qx-border py-8 px-4 shadow sm:rounded-lg sm:px-10">
            
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center text-red-500 text-sm">
                <ShieldAlert size={18} className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-qx-textSecondary">
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-qx-textSecondary" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 bg-black/20 border border-qx-border rounded-xl py-3 text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-qx-textSecondary">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-qx-textSecondary" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 bg-black/20 border border-qx-border rounded-xl py-3 text-qx-text focus:outline-none focus:border-qx-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-qx-primary hover:bg-[#FF7A33] focus:outline-none transition-colors"
                >
                  Sign In to CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
