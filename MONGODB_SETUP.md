# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free & Easy)

MongoDB Atlas is a free cloud database service. Here's how to set it up:

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose the FREE tier (M0)
3. Select a cloud provider and region (choose closest to you)
4. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access" in the left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and password (save these!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### Step 4: Whitelist Your IP
1. Go to "Network Access" in the left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development) or add your specific IP
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in the left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
5. Replace `<password>` with your database user password
6. Add your database name at the end: `...mongodb.net/chess-app?retryWrites=true&w=majority`

### Step 6: Update .env.local
Open `.env.local` and replace `MONGODB_URI` with your connection string:
```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/chess-app?retryWrites=true&w=majority
```

## Option 2: Local MongoDB Installation

### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service
5. MongoDB will start automatically

The connection string in `.env.local` should already be correct:
```
MONGODB_URI=mongodb://localhost:27017/chess-app
```

### Verify MongoDB is Running:
```bash
mongod --version
```

## Testing the Connection

After setting up MongoDB, restart your server and try to register a user. If you see any connection errors, check:
- Your connection string is correct
- Your IP is whitelisted (for Atlas)
- Your database user credentials are correct
- MongoDB service is running (for local)


