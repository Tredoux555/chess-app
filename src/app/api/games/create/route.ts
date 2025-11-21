import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/models/Game';
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { opponentId } = await request.json();

    if (!opponentId) {
      return NextResponse.json(
        { error: 'Opponent ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const game = await Game.create({
      whitePlayer: user.id,
      blackPlayer: opponentId,
      status: 'waiting',
    });

    return NextResponse.json(
      {
        game: {
          id: game._id,
          whitePlayer: game.whitePlayer,
          blackPlayer: game.blackPlayer,
          status: game.status,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


