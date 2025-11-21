const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const { Chess } = require('chess.js');
  const games = new Map();

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinGame', async ({ gameId, userId }) => {
      try {
        socket.join(gameId);

        if (!games.has(gameId)) {
          const chess = new Chess();
          games.set(gameId, {
            chess,
            whitePlayer: null,
            blackPlayer: null,
            players: new Set(),
          });
        }

        const game = games.get(gameId);
        game.players.add(userId);

        if (!game.whitePlayer) {
          game.whitePlayer = userId;
        } else if (!game.blackPlayer && game.whitePlayer !== userId) {
          game.blackPlayer = userId;
          game.chess = new Chess();
          io.to(gameId).emit('gameState', {
            fen: game.chess.fen(),
            pgn: game.chess.pgn(),
          });
        }

        socket.emit('gameJoined', {
          gameId,
          whitePlayer: game.whitePlayer,
          blackPlayer: game.blackPlayer,
          fen: game.chess.fen(),
          pgn: game.chess.pgn(),
        });

        io.to(gameId).emit('playerJoined', { userId });
      } catch (error) {
        socket.emit('error', error.message);
      }
    });

    socket.on('makeMove', ({ gameId, from, to, promotion, userId }) => {
      try {
        const game = games.get(gameId);
        if (!game) {
          socket.emit('error', 'Game not found');
          return;
        }

        // Validate it's the player's turn
        const isWhiteTurn = game.chess.turn() === 'w';
        const isWhitePlayer = game.whitePlayer === userId;
        const isBlackPlayer = game.blackPlayer === userId;

        if (isWhiteTurn && !isWhitePlayer) {
          socket.emit('error', 'Not your turn');
          return;
        }

        if (!isWhiteTurn && !isBlackPlayer) {
          socket.emit('error', 'Not your turn');
          return;
        }

        // Validate the piece belongs to the player
        const piece = game.chess.get(from);
        if (!piece) {
          socket.emit('error', 'No piece at that square');
          return;
        }

        const pieceColor = piece.color === 'w' ? 'white' : 'black';
        if ((pieceColor === 'white' && !isWhitePlayer) || (pieceColor === 'black' && !isBlackPlayer)) {
          socket.emit('error', 'You can only move your own pieces');
          return;
        }

        // First check if the move is in the list of legal moves
        const legalMoves = game.chess.moves({
          square: from,
          verbose: true,
        });
        
        const isLegalMove = legalMoves.some(legalMove => 
          legalMove.from === from && 
          legalMove.to === to
        );
        
        if (!isLegalMove) {
          socket.emit('error', 'Illegal move - violates chess rules');
          return;
        }

        // Validate the move using chess.js (enforces all chess rules)
        const move = game.chess.move({
          from,
          to,
          promotion: promotion || 'q',
        });

        if (move) {
          io.to(gameId).emit('move', { from, to, promotion });
          io.to(gameId).emit('gameState', {
            fen: game.chess.fen(),
            pgn: game.chess.pgn(),
          });

          if (game.chess.isGameOver()) {
            let winner = null;
            if (game.chess.isCheckmate()) {
              winner = game.chess.turn() === 'w' ? 'black' : 'white';
            } else if (game.chess.isDraw()) {
              winner = 'draw';
            }

            io.to(gameId).emit('gameOver', { winner });
            games.delete(gameId);
          }
        } else {
          socket.emit('error', 'Invalid move - violates chess rules');
        }
      } catch (error) {
        socket.emit('error', error.message || 'Invalid move');
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});


