'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Game {
  _id: string;
  whitePlayer: User;
  blackPlayer: User;
  status: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchUsers();
      fetchGames();
    }
  }, [status, router]);

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700 mb-2">Loading...</div>
          <div className="text-sm text-gray-500">Checking authentication...</div>
        </div>
      </div>
    );
  }

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users/list');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchGames = async () => {
    try {
      const res = await fetch('/api/games');
      if (res.ok) {
        const data = await res.json();
        setGames(data.games || []);
      }
    } catch (err) {
      console.error('Failed to fetch games:', err);
    } finally {
      setLoading(false);
    }
  };

  const createGame = async (opponentId: string) => {
    try {
      const res = await fetch('/api/games/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ opponentId }),
      });

      if (!res.ok) {
        throw new Error('Failed to create game');
      }

      const data = await res.json();
      router.push(`/game/${data.game.id}`);
    } catch (err: any) {
      alert(err.message || 'Failed to create game');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700 mb-2">Loading...</div>
          <div className="text-sm text-gray-500">Loading your games...</div>
        </div>
      </div>
    );
  }

  const currentUserId = (session?.user as any)?.id;
  const otherUsers = users.filter((u) => u._id !== currentUserId);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Chess App</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Welcome, {session?.user?.name}
              </span>
              {(session?.user as any)?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                href="/api/auth/signout"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start a New Game</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select an Opponent</h3>
            {otherUsers.length === 0 ? (
              <p className="text-gray-500">No other users available</p>
            ) : (
              <div className="space-y-2">
                {otherUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => createGame(user._id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Challenge
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Games</h2>
          <div className="bg-white shadow rounded-lg">
            {games.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No games yet</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {games.map((game) => (
                  <li key={game._id} className="p-4 hover:bg-gray-50">
                    <Link href={`/game/${game._id}`} className="block">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            vs{' '}
                            {game.whitePlayer._id === currentUserId ||
                            game.whitePlayer.toString() === currentUserId
                              ? game.blackPlayer.name
                              : game.whitePlayer.name}
                          </p>
                          <p className="text-xs text-gray-500">Status: {game.status}</p>
                        </div>
                        <span className="text-indigo-600">View Game →</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
