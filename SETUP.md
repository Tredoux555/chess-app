# Chess App Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/chess-app
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

**Important:** Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Set Up MongoDB

**Option A: MongoDB Atlas (Recommended for beginners)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env.local` with your connection string

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/chess-app` as your `MONGODB_URI`

### 4. Run the Application

**For development with Socket.IO support:**
```bash
node server.js
```

**Or use standard Next.js dev server (Socket.IO won't work):**
```bash
npm run dev
```

### 5. Create Your First Admin User

After registering your first account, you need to make yourself an admin. You can do this by:

**Option A: Using MongoDB directly**
```javascript
// Connect to your MongoDB database
use chess-app
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**Option B: Using MongoDB Compass or similar tool**
- Find your user document
- Change the `role` field from `"user"` to `"admin"`

## Features

✅ **User Authentication** - Register and login system
✅ **Real-time Chess** - Play with friends using WebSockets
✅ **Game Lobby** - Challenge other players
✅ **Admin Panel** - Manage users (at `/admin`)
✅ **Game History** - View your past games

## Troubleshooting

### Socket.IO Connection Issues

If you see connection errors:
1. Make sure you're running `node server.js` (not `npm run dev`)
2. Check that `NEXT_PUBLIC_SOCKET_URL` matches your server URL
3. Ensure port 3000 is not blocked by firewall

### MongoDB Connection Issues

1. Verify your `MONGODB_URI` is correct
2. For Atlas: Check your IP is whitelisted
3. For Atlas: Verify your database user credentials

### Authentication Issues

1. Make sure `NEXTAUTH_SECRET` is set
2. Clear browser cookies and try again
3. Check that `NEXTAUTH_URL` matches your app URL

## Next Steps

1. Register an account
2. Make yourself an admin (see above)
3. Invite your grandfather and friends to register
4. Start playing chess!

## Support

For issues or questions, check the main README.md file for more details.


