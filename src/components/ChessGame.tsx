'use client';

import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { io, Socket } from 'socket.io-client';

interface ChessGameProps {
  gameId: string;
  userId: string;
  playerColor: 'white' | 'black';
  socket: Socket | null;
}

export default function ChessGame({ gameId, userId, playerColor, socket }: ChessGameProps) {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState({});
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    socket.on('gameState', (data: { fen: string; pgn: string }) => {
      const newGame = new Chess();
      if (data.pgn && data.pgn.trim()) {
        try {
          newGame.loadPgn(data.pgn);
        } catch (e) {
          // If PGN loading fails, use FEN
          newGame.load(data.fen);
        }
      } else {
        newGame.load(data.fen);
      }
      setGame(newGame);
      updateStatus(newGame);
    });

    const handleMove = (data: { from: string; to: string; promotion?: string }) => {
      setGame((currentGame) => {
        const newGame = new Chess(currentGame.fen());
        try {
          newGame.move({
            from: data.from,
            to: data.to,
            promotion: data.promotion || 'q',
          });
          updateStatus(newGame);
          return newGame;
        } catch (e) {
          console.error('Invalid move received:', e);
          return currentGame;
        }
      });
    };

    socket.on('move', handleMove);

    socket.on('gameOver', (data: { winner?: 'white' | 'black' | 'draw' }) => {
      if (data.winner === 'draw') {
        setStatus('Game ended in a draw!');
      } else if (data.winner === playerColor) {
        setStatus('You won!');
      } else {
        setStatus('You lost!');
      }
    });

    socket.on('error', (errorMessage: string) => {
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    });

    return () => {
      socket.off('gameState');
      socket.off('move', handleMove);
      socket.off('gameOver');
      socket.off('error');
    };
  }, [socket, playerColor]);

  function updateStatus(game: Chess) {
    if (game.isCheckmate()) {
      setStatus('Checkmate!');
    } else if (game.isDraw()) {
      setStatus('Draw!');
    } else if (game.isCheck()) {
      setStatus('Check!');
    } else {
      setStatus('');
    }
  }

  function getMoveOptions(square: string) {
    const moves = game.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: any = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to as any) && game.get(move.to as any).color !== game.get(square as any).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: string) {
    if (game.turn() !== (playerColor === 'white' ? 'w' : 'b')) {
      return;
    }

    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
    } else {
      // Check if the destination square is a legal move
      const legalMoves = game.moves({
        square: moveFrom,
        verbose: true,
      });
      
      const isLegalMove = legalMoves.some(move => move.to === square);
      
      if (!isLegalMove) {
        // Not a legal move - either select new piece or clear selection
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) {
          setMoveFrom(square);
        } else {
          setMoveFrom(null);
          setOptionSquares({});
        }
        return;
      }

      // Only make move if it's legal
      const move = makeMove({
        from: moveFrom,
        to: square,
      });

      if (!move) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) {
          setMoveFrom(square);
        } else {
          setMoveFrom(null);
          setOptionSquares({});
        }
      }
    }
  }

  function makeMove(move: { from: string; to: string; promotion?: string }) {
    // Check if it's the player's turn
    if (game.turn() !== (playerColor === 'white' ? 'w' : 'b')) {
      setError('Not your turn!');
      setTimeout(() => setError(''), 2000);
      return null;
    }

    // First, verify this is a legal move by checking all legal moves
    const legalMoves = game.moves({
      square: move.from,
      verbose: true,
    });
    
    const isLegalMove = legalMoves.some(legalMove => 
      legalMove.from === move.from && 
      legalMove.to === move.to &&
      (!move.promotion || legalMove.promotion === move.promotion)
    );
    
    if (!isLegalMove) {
      setError('Illegal move!');
      setTimeout(() => setError(''), 2000);
      setMoveFrom(null);
      setOptionSquares({});
      return null;
    }

    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion || 'q',
      });

      if (result) {
        setGame(gameCopy);
        updateStatus(gameCopy);
        setMoveFrom(null);
        setOptionSquares({});
        setError(''); // Clear any previous errors

        if (socket) {
          socket.emit('makeMove', {
            gameId,
            userId,
            from: move.from,
            to: move.to,
            promotion: move.promotion,
          });
        }

        return result;
      }
    } catch (e: any) {
      setError(e.message || 'Invalid move');
      setTimeout(() => setError(''), 2000);
      setMoveFrom(null);
      setOptionSquares({});
      return null;
    }
    return null;
  }

  const isPlayerTurn = game.turn() === (playerColor === 'white' ? 'w' : 'b');

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {playerColor === 'white' ? 'White' : 'Black'} Player
        </h2>
        {status && <p className="text-lg font-semibold text-blue-600">{status}</p>}
        {error && <p className="text-lg font-semibold text-red-600">{error}</p>}
        {!status && !error && isPlayerTurn && <p className="text-lg text-green-600">Your turn!</p>}
        {!status && !error && !isPlayerTurn && <p className="text-lg text-gray-600">Waiting for opponent...</p>}
      </div>
      <div className="w-full max-w-2xl">
        <Chessboard
          position={game.fen()}
          onSquareClick={onSquareClick}
          onPieceDrop={(sourceSquare, targetSquare) => {
            // Validate move before allowing drop
            if (game.turn() !== (playerColor === 'white' ? 'w' : 'b')) {
              return false;
            }
            
            const legalMoves = game.moves({
              square: sourceSquare,
              verbose: true,
            });
            
            const isLegalMove = legalMoves.some(move => move.to === targetSquare);
            
            if (!isLegalMove) {
              setError('Illegal move!');
              setTimeout(() => setError(''), 2000);
              return false;
            }
            
            const move = makeMove({
              from: sourceSquare,
              to: targetSquare,
            });
            
            return move !== null;
          }}
          customSquareStyles={{
            ...optionSquares,
          }}
          boardOrientation={playerColor}
          arePiecesDraggable={isPlayerTurn}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>FEN: {game.fen()}</p>
      </div>
    </div>
  );
}

