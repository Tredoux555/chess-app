'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StorePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('storeUser');
    if (!stored) {
      router.push('/hehe');
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('storeUser');
    router.push('/hehe');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] text-white p-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">🛒 Secret Store</h1>
          <div>
            <span className="text-white/60">Welcome, {user.name}</span>
            <button onClick={logout} className="ml-4 text-purple-400 hover:text-purple-300">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-full text-center py-16 text-white/50">
            <h2 className="text-2xl mb-2">🚧 Coming Soon!</h2>
            <p>Products will be added here. Stay tuned!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
