# Chess App - Online Multiplayer Chess Game

A full-featured chess application built with Next.js that allows you to play chess with friends and family online, including real-time multiplayer gameplay, user authentication, and admin panel for user management.

## Features

- 🎮 **Real-time Multiplayer Chess** - Play chess with friends in real-time using WebSockets
- 🔐 **User Authentication** - Secure login and registration system
- 👥 **User Management** - Admin panel to manage users and roles
- 🎯 **Game Lobby** - Easy matchmaking to start games with other players
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Chess Engine**: chess.js
- **Chessboard UI**: react-chessboard

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   NEXTAUTH_SECRET=your-random-secret-key
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
   ```

   To generate a secure `NEXTAUTH_SECRET`, run:
   ```bash
   openssl rand -base64 32
   ```

3. **Set up MongoDB:**
   - Option 1: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
   - Option 2: Install MongoDB locally
   - Copy your connection string to `MONGODB_URI` in `.env.local`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Or use the custom server with Socket.IO:
   ```bash
   node server.js
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Creating an Account

1. Click "Register" or navigate to `/register`
2. Fill in your name, email, and password
3. You'll be redirected to the login page

### Playing a Game

1. Log in to your account
2. On the home page, you'll see a list of other users
3. Click "Challenge" next to a user to start a game
4. The game will open in real-time - make moves and see your opponent's moves instantly

### Admin Panel

1. Create a user account
2. Manually set the user's role to "admin" in the database, or use the admin panel if you have access
3. Navigate to `/admin` to manage users:
   - View all users
   - Change user roles (make admin/remove admin)
   - Delete users

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/          # API routes (auth, games, users)
│   │   ├── admin/        # Admin panel
│   │   ├── game/         # Game pages
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   ├── models/          # MongoDB models
│   └── types/           # TypeScript types
├── server.js            # Custom server with Socket.IO
└── package.json
```

## API Routes

- `POST /api/auth/register` - Register a new user
- `GET /api/auth/[...nextauth]` - NextAuth authentication
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/list` - Get all users (authenticated)
- `PATCH /api/users/[id]` - Update user (admin only)
- `DELETE /api/users/[id]` - Delete user (admin only)
- `GET /api/games` - Get user's games
- `POST /api/games/create` - Create a new game

## Socket.IO Events

### Client to Server:
- `joinGame` - Join a game room
- `makeMove` - Make a chess move

### Server to Client:
- `gameJoined` - Confirmation of joining a game
- `gameState` - Current game state (FEN, PGN)
- `move` - Opponent's move
- `gameOver` - Game finished
- `error` - Error message

## Making a User an Admin

To make a user an admin, you can:

1. **Using MongoDB directly:**
   ```javascript
   db.users.updateOne(
     { email: "user@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. **Using the Admin Panel:**
   - If you already have admin access, use the "Make Admin" button

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Note:** For Socket.IO to work on Vercel, you may need to use a separate server or Vercel's serverless functions with a different approach.

### Other Platforms

For platforms that support Node.js servers, deploy both the Next.js app and the Socket.IO server. You may need to adjust the Socket.IO configuration for your hosting provider.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [chess.js Documentation](https://github.com/jhlywa/chess.js)
- [react-chessboard Documentation](https://github.com/Clariity/react-chessboard)

## License

MIT
