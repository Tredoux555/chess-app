# Quick Start Guide - Get Playing in 5 Minutes!

## Step 1: Set Up MongoDB Atlas (2 minutes)

### Option A: Automated Setup (Easiest)
1. Run: `node setup-mongodb.js`
2. Follow the on-screen instructions
3. When you have your connection string, run:
   ```
   node setup-mongodb.js update "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chess-app?retryWrites=true&w=majority"
   ```

### Option B: Manual Setup
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Click "Try Free" and create account
3. Click "Build a Database" → Choose FREE (M0) → Create
4. Click "Database Access" → Add New User:
   - Username: `chessadmin` (or any username)
   - Password: Create a strong password (save it!)
   - Privileges: "Atlas admin"
   - Click "Add User"
5. Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere" → Confirm
6. Go back to "Database" → Click "Connect" → "Connect your application"
7. Copy the connection string (looks like: `mongodb+srv://chessadmin:password@cluster0.xxxxx.mongodb.net/`)
8. Add database name: Change `?retryWrites=true&w=majority` to `/chess-app?retryWrites=true&w=majority`
9. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://chessadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/chess-app?retryWrites=true&w=majority
   ```

## Step 2: Restart Server (30 seconds)

Stop the current server (Ctrl+C) and restart:
```bash
node server.js
```

## Step 3: Create Your Account (1 minute)

1. Open http://localhost:3000
2. Click "Register" or go to http://localhost:3000/register
3. Enter your name, email, and password
4. Click "Register"
5. You'll be redirected to login - sign in with your credentials

## Step 4: Make Yourself Admin (1 minute)

### Using MongoDB Atlas:
1. Go to your MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Find the `users` collection
4. Find your user document (by email)
5. Click the edit icon
6. Change `"role": "user"` to `"role": "admin"`
7. Click "Update"

### Using MongoDB Compass (if installed locally):
1. Connect to your database
2. Navigate to `chess-app` → `users`
3. Find your user and update `role` field to `"admin"`

## Step 5: Start Playing! (30 seconds)

1. Go to http://localhost:3000
2. You should see the admin panel link (if you're admin)
3. Invite friends to register
4. Challenge them to a game!
5. Click "Challenge" next to any user to start playing

## Troubleshooting

### "Cannot connect to MongoDB"
- Check your connection string in `.env.local`
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify your database user password is correct

### "Authentication failed"
- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Clear browser cookies and try again

### "Socket.IO connection failed"
- Make sure you're running `node server.js` (not `npm run dev`)
- Check that port 3000 is not blocked

## Need Help?

- Check `MONGODB_SETUP.md` for detailed MongoDB setup
- Check `SETUP.md` for general setup instructions
- Check `README.md` for full documentation


