'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';
import ChessGame from '@/components/ChessGame';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const gameId = params.id as string;

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (!session?.user) return;

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    const newSocket = io(socketUrl, {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      newSocket.emit('joinGame', { gameId, userId: (session.user as any).id });
    });

    newSocket.on('gameJoined', (data: any) => {
      setGameData(data);
      setLoading(false);
    });

    newSocket.on('error', (error: string) => {
      console.error('Socket error:', error);
      alert(error);
      router.push('/');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [session, status, gameId, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading game...</div>
      </div>
    );
  }

  if (!gameData || !socket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Failed to load game</div>
      </div>
    );
  }

  const userId = (session?.user as any)?.id;
  const playerColor =
    gameData.whitePlayer._id === userId || gameData.whitePlayer.toString() === userId
      ? 'white'
      : 'black';

  return (
    <div className="min-h-screen bg-gray-100">
      <ChessGame gameId={gameId} userId={userId} playerColor={playerColor} socket={socket} />
    </div>
  );
}

