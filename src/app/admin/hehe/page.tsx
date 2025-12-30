'use client';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const login = async () => {
    const res = await fetch('/api/secret-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get-users', pass: password })
    });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
      setLoggedIn(true);
    } else {
      alert('Wrong password');
    }
  };

  const loadUsers = async () => {
    const res = await fetch('/api/secret-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get-users', pass: password })
    });
    const data = await res.json();
    setUsers(data.users);
  };

  const approve = async (id: string) => {
    await fetch('/api/secret-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'approve', pass: password, id })
    });
    loadUsers();
  };

  const reject = async (id: string) => {
    await fetch('/api/secret-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reject', pass: password, id })
    });
    loadUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    await fetch('/api/secret-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', pass: password, id })
    });
    loadUsers();
  };

  const pending = users.filter(u => u.status === 'pending');
  const approved = users.filter(u => u.status === 'approved');
  const rejected = users.filter(u => u.status === 'rejected');

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-5">
        <div className="bg-white/5 p-10 rounded-2xl max-w-md w-full">
          <h1 className="text-white text-2xl text-center mb-6">👑 Admin</h1>
          <input type="password" placeholder="Admin password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full p-4 mb-4 bg-black/30 border border-white/10 rounded-xl text-white outline-none"
            onKeyDown={e => e.key === 'Enter' && login()} />
          <button onClick={login} className="w-full p-4 bg-purple-600 rounded-xl text-white font-semibold">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">👑 Secret Store Admin</h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-yellow-400">{pending.length}</div>
            <div className="text-white/50">Pending</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-green-400">{approved.length}</div>
            <div className="text-white/50">Approved</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-red-400">{rejected.length}</div>
            <div className="text-white/50">Rejected</div>
          </div>
        </div>

        <button onClick={loadUsers} className="mb-6 px-4 py-2 bg-white/10 rounded-lg">🔄 Refresh</button>

        <Section title="⏳ Pending Requests" users={pending} showActions onApprove={approve} onReject={reject} onDelete={deleteUser} />
        <Section title="✅ Approved Users" users={approved} onDelete={deleteUser} />
        <Section title="❌ Rejected Users" users={rejected} onDelete={deleteUser} />
      </div>
    </div>
  );
}

function Section({ title, users, showActions, onApprove, onReject, onDelete }: {
  title: string;
  users: User[];
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {users.length === 0 ? (
        <div className="text-white/40 text-center py-6">No users</div>
      ) : (
        <div className="space-y-3">
          {users.map(user => (
            <div key={user.id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-medium">{user.name} <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                  user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  user.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                  'bg-red-500/20 text-red-300'
                }`}>{user.status}</span></div>
                <div className="text-white/50 text-sm">{user.email}</div>
                {user.reason && <div className="text-white/40 text-sm italic">"{user.reason}"</div>}
                <div className="text-white/30 text-xs">{new Date(user.requestedAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                {showActions && onApprove && <button onClick={() => onApprove(user.id)} className="px-4 py-2 bg-green-600 rounded-lg">✓</button>}
                {showActions && onReject && <button onClick={() => onReject(user.id)} className="px-4 py-2 bg-red-600 rounded-lg">✗</button>}
                <button onClick={() => onDelete(user.id)} className="px-4 py-2 bg-white/10 rounded-lg">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
