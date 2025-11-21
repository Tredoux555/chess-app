import mongoose, { Schema, Model } from 'mongoose';

export interface IGame {
  _id?: string;
  whitePlayer: mongoose.Types.ObjectId;
  blackPlayer: mongoose.Types.ObjectId;
  fen: string;
  pgn: string;
  status: 'waiting' | 'active' | 'finished';
  winner?: 'white' | 'black' | 'draw';
  createdAt?: Date;
  updatedAt?: Date;
}

const GameSchema = new Schema<IGame>(
  {
    whitePlayer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blackPlayer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fen: {
      type: String,
      default: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    },
    pgn: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['waiting', 'active', 'finished'],
      default: 'waiting',
    },
    winner: {
      type: String,
      enum: ['white', 'black', 'draw'],
    },
  },
  {
    timestamps: true,
  }
);

const Game: Model<IGame> = mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;


