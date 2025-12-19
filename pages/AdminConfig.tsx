
import React, { useState } from 'react';
import { ShieldAlert, Save, ArrowLeft, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminPasscode, saveAdminPasscode } from '../services/storageService';

const AdminConfig: React.FC = () => {
  const [currentTry, setCurrentTry] = useState('');
  const [newPass, setNewPass] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTry === getAdminPasscode()) {
      setIsUnlocked(true);
      setMsg({ type: '', text: '' });
    } else {
      setMsg({ type: 'error', text: 'Authentication failed.' });
      setCurrentTry('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 10) {
      setMsg({ type: 'error', text: 'Min 10 characters required.' });
      return;
    }
    saveAdminPasscode(newPass);
    setMsg({ type: 'success', text: 'System passcode updated successfully.' });
    setTimeout(() => navigate('/admin'), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 shadow-sm border border-zinc-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
            <Key size={20} />
          </div>
        </div>
        
        <h1 className="text-2xl font-normal serif text-center mb-2">Gatekeeper Settings</h1>
        <p className="text-[10px] text-zinc-400 text-center uppercase tracking-[0.2em] mb-10">System Access Configuration</p>

        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Identity Verification</label>
              <input 
                type="password"
                value={currentTry}
                onChange={(e) => setCurrentTry(e.target.value)}
                className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition text-center text-xl tracking-widest"
                placeholder="CURRENT PASSCODE"
              />
            </div>
            {msg.text && <p className="text-xs text-red-500 text-center italic">{msg.text}</p>}
            <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-zinc-800 transition">
              Verify Identity
            </button>
          </form>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">New Master Passcode</label>
              <input 
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-black transition text-center text-xl tracking-widest"
                placeholder="MIN 10 CHARACTERS"
              />
            </div>
            {msg.text && <p className={`text-xs text-center italic ${msg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{msg.text}</p>}
            <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-zinc-800 transition">
              Apply System Change
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-zinc-400 uppercase tracking-widest hover:text-black flex items-center justify-center transition">
            <ArrowLeft size={12} className="mr-2" />
            <span>Return to Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminConfig;
