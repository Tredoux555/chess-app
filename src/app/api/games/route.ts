import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Game from '@/models/Game';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    await connectDB();

    const games = await Game.find({
      $or: [{ whitePlayer: user.id }, { blackPlayer: user.id }],
    })
      .populate('whitePlayer', 'name email')
      .populate('blackPlayer', 'name email')
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json({ games }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


