'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretStorePage() {
  const [tab, setTab] = useState<'login' | 'request'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqReason, setReqReason] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'pending' } | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (!loginEmail) { setMessage({ text: 'Enter your email', type: 'error' }); return; }
    const res = await fetch('/api/secret-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email: loginEmail })
    });
    const data = await res.json();
    if (data.status === 'approved') {
      setMessage({ text: `Welcome ${data.name}! Entering store...`, type: 'success' });
      localStorage.setItem('storeUser', JSON.stringify({ email: loginEmail, name: data.name }));
      setTimeout(() => router.push('/hehe/store'), 1000);
    } else if (data.status === 'pending') {
      setMessage({ text: '⏳ Your request is pending approval', type: 'pending' });
    } else if (data.status === 'rejected') {
      setMessage({ text: '❌ Access denied', type: 'error' });
    } else {
      setMessage({ text: data.error || 'Not found', type: 'error' });
    }
  };

  const handleRequest = async () => {
    if (!reqName || !reqEmail) { setMessage({ text: 'Name and email required', type: 'error' }); return; }
    const res = await fetch('/api/secret-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'request-access', name: reqName, email: reqEmail, reason: reqReason })
    });
    const data = await res.json();
    if (data.success) {
      setMessage({ text: '✅ Request sent! Check back later.', type: 'success' });
    } else {
      setMessage({ text: data.error, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-5">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-10 max-w-md w-full border border-white/10">
        <div className="text-6xl text-center mb-5">🔐</div>
        <h1 className="text-white text-3xl text-center font-semibold mb-2">Secret Store</h1>
        <p className="text-white/50 text-center mb-8">Exclusive access only</p>

        <div className="flex mb-6">
          <button onClick={() => { setTab('login'); setMessage(null); }}
            className={`flex-1 py-3 text-center border-b-2 transition ${tab === 'login' ? 'text-purple-500 border-purple-500' : 'text-white/50 border-transparent'}`}>
            Login
          </button>
          <button onClick={() => { setTab('request'); setMessage(null); }}
            className={`flex-1 py-3 text-center border-b-2 transition ${tab === 'request' ? 'text-purple-500 border-purple-500' : 'text-white/50 border-transparent'}`}>
            Request Access
          </button>
        </div>

        {tab === 'login' && (
          <div>
            <input type="email" placeholder="Your email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
              className="w-full p-4 mb-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" />
            <button onClick={handleLogin}
              className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold hover:-translate-y-0.5 transition">
              Enter Store
            </button>
          </div>
        )}

        {tab === 'request' && (
          <div>
            <input type="text" placeholder="Your name" value={reqName} onChange={e => setReqName(e.target.value)}
              className="w-full p-4 mb-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" />
            <input type="email" placeholder="Your email" value={reqEmail} onChange={e => setReqEmail(e.target.value)}
              className="w-full p-4 mb-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" />
            <textarea placeholder="Why do you want access? (optional)" value={reqReason} onChange={e => setReqReason(e.target.value)}
              className="w-full p-4 mb-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none h-20 resize-none" />
            <button onClick={handleRequest}
              className="w-full p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold hover:-translate-y-0.5 transition">
              Request Access
            </button>
          </div>
        )}

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center ${
            message.type === 'success' ? 'bg-green-500/20 text-green-300' :
            message.type === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <a href="/" className="block text-center mt-8 text-white/40 hover:text-white/60 transition">← Back to Riddick Chess</a>
      </div>
    </div>
  );
}
